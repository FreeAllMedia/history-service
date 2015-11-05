"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _lib = require("../../lib/");

var _lib2 = _interopRequireDefault(_lib);

var _ioredis = require("ioredis");

var _ioredis2 = _interopRequireDefault(_ioredis);

describe(".redis", function () {
    it("should return the default redis client when none is provided to the constructor options", function () {
        var historyService = new _lib2["default"]({
            dynamodb: {},
            credentials: {
                redis: {}
            }
        });
        historyService.redis.should.be.instanceOf(_ioredis2["default"]);
    });

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