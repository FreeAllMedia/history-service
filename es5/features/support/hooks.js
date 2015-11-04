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

function hooks() {
	/* Called before each scenario */
	this.Before(function (event, callback) {
		var portNumber = 1338;

		this.url = "http://localhost:" + portNumber;

		var mockRedisClient = _redisJs2["default"].createClient();

		this.service = new _lib2["default"]({
			redis: mockRedisClient
		});

		this.service.listen(portNumber, function () {
			process.stdout.write("\nTest service for features listening on port " + portNumber + "\n");
			callback();
		});
	});

	/* Called after all features are run */
	this.After(function (event, callback) {
		this.service.close(function () {
			process.stdout.write("\nTest service closed.\n");
			callback();
		});
	});
}

module.exports = exports["default"];