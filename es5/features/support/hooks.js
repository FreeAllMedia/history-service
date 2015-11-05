/* eslint-disable new-cap */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = hooks;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lib = require("../../lib/");

var _lib2 = _interopRequireDefault(_lib);

var _redisJs = require("redis-js");

var _redisJs2 = _interopRequireDefault(_redisJs);

// Sounds like actual Redis client, but is actually a mock library

var _environmentsJson = require("../../../environments.json");

var _environmentsJson2 = _interopRequireDefault(_environmentsJson);

function hooks() {
	/* Called before each scenario */
	this.Before(function (event, callback) {
		var portNumber = 1338;

		this.url = "http://localhost:" + portNumber;

		/**
   * WARNING
   *
   * This mockRedis library (`redis-js`) will return a client that is always
   * connected to the same database. So, you will need to clear all keys from
   * the mockRedis database in order to ensure that no tests contaminate the others.
   */
		this.mockRedisClient = _redisJs2["default"].createClient();

		this.service = new _lib2["default"]({
			redis: this.mockRedisClient,
			dynamodb: {}
		});

		this.service.listen(portNumber, function () {
			process.stdout.write("\nTest service for features listening on port " + portNumber + "\n");
			callback();
		});
	});

	/* Called after all features are run */
	this.After(function (event, callback) {
		var _this = this;

		this.service.close(function () {
			process.stdout.write("\nTest service closed.\n");

			_this.mockRedisClient.flushall(function () {
				process.stdout.write("\nMock redis database flushed.\n");

				callback();
			});
		});
	});
}

module.exports = exports["default"];