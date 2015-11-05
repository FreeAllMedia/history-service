"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lib = require("../../lib/");

var _lib2 = _interopRequireDefault(_lib);

var _kue = require("kue");

var _kue2 = _interopRequireDefault(_kue);

var _optionsJson = require("../options.json");

var _optionsJson2 = _interopRequireDefault(_optionsJson);

var Queue = _kue2["default"].createQueue().constructor;

describe(".queue", function () {
    it("should return an instance of a `kue` queue", function () {
        var historyService = new _lib2["default"](_optionsJson2["default"]);

        historyService.queue.should.be.instanceOf(Queue);
    });
});