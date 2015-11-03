"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = listen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

function listen(portNumber, callback) {
    var _ = (0, _incognito2["default"])(this);
    _.router.listen(portNumber, callback);
}

module.exports = exports["default"];