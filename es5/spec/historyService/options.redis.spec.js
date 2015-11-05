"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _lib = require("../../lib/");

var _lib2 = _interopRequireDefault(_lib);

describe("options.redis", function () {
    it("should pass the redis client to the queing system", function () {
        var MockRedis = function MockRedis() {
            _classCallCheck(this, MockRedis);
        };

        var options = {
            redis: new MockRedis(),
            dynamodb: {}
        };

        var historyService = new _lib2["default"](options);

        historyService.redis.should.be.instanceOf(MockRedis);
    });
});