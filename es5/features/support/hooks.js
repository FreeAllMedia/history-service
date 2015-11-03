/* eslint-disable new-cap */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = hooks;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lib = require("../../lib/");

var _lib2 = _interopRequireDefault(_lib);

function hooks() {
	var service = undefined,
	    portNumber = 1338;

	/* Called once before all features are run */
	this.BeforeFeatures(function (scenario, callback) {
		service = new _lib2["default"]();
		service.listen(portNumber, function () {
			process.stdout.write("\nTest service for features listening on port " + portNumber + "\n");
			callback();
		});
	});

	/* Called before each scenario */
	this.Before(function () {
		this.url = "http://localhost:" + portNumber;
	});

	/* Called after all features are run */
	this.AfterFeatures(function (scenario, callback) {
		service.close(function () {
			process.stdout.write("\nTest service closed.\n");
			callback();
		});
	});
}

module.exports = exports["default"];