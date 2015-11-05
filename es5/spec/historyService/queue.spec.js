"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lib = require("../../lib/");

var _lib2 = _interopRequireDefault(_lib);

var _kue = require("kue");

var _kue2 = _interopRequireDefault(_kue);

var _credentialsJson = require("../credentials.json");

var _credentialsJson2 = _interopRequireDefault(_credentialsJson);

var Queue = _kue2["default"].createQueue().constructor;

describe(".queue", function () {
    it("should return an instance of a `kue` queue", function () {
        var historyService = new _lib2["default"]({ credentials: _credentialsJson2["default"] });

        historyService.queue.should.be.instanceOf(Queue);
    });
});