"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lib = require("../../lib/");

var _lib2 = _interopRequireDefault(_lib);

var _ioredis = require("ioredis");

var _ioredis2 = _interopRequireDefault(_ioredis);

describe(".redis", function () {
    it("should return the default redis client when none is provided to the constructor options", function () {
        var historyService = new _lib2["default"]();
        historyService.redis.should.be.instanceOf(_ioredis2["default"]);
    });
});