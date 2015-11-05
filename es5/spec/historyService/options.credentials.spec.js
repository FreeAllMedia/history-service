"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lib = require("../../lib/");

var _lib2 = _interopRequireDefault(_lib);

describe("options.credentials", function () {
    /* eslint-disable no-unused-vars */
    var historyService = undefined;

    describe("(when both options.credentials.redis and options.redis are not set)", function () {
        it("should return an error with message 'A Redis client or credentials are required.'", function () {
            (function () {
                historyService = new _lib2["default"]({
                    dynamodb: {}
                });
            }).should["throw"]("Error: A Redis client or credentials are required.");
        });
    });

    describe("(when both options.credentials.dynamodb and options.dynamodb are not set)", function () {
        it("should return an error with message 'A DynamoDB client or credentials are required.'", function () {
            (function () {
                historyService = new _lib2["default"]({
                    redis: {}
                });
            }).should["throw"]("Error: A DynamoDB client or credentials are required.");
        });
    });

    describe("(when options.credentials.dynamodb, options.dynamodb, options.credentials.redis, and options.redis are not set)", function () {
        it("should return an error with message 'A DynamoDB client or credentials are required., A Redis client or credentials are required.'", function () {
            (function () {
                historyService = new _lib2["default"]();
            }).should["throw"]("Error: A Redis client or credentials are required., A DynamoDB client or credentials are required.");
        });
    });
});