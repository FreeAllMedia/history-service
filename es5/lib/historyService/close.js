"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = close;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

function close(callback) {
    (0, _incognito2["default"])(this).router.close(callback);
}

module.exports = exports["default"];