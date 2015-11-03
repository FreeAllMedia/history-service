/* eslint-disable new-cap */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = WorldClass;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiString = require("chai-string");

var _chaiString2 = _interopRequireDefault(_chaiString);

_chai2["default"].should();
_chai2["default"].use(_chaiString2["default"]);

function WorldClass() {
	this.World = function World(callback) {
		callback();
	};
}

module.exports = exports["default"];