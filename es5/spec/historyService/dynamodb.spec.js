"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _lib = require("../../lib/");

var _lib2 = _interopRequireDefault(_lib);

var _dynamoClient = require("dynamo-client");

var _dynamoClient2 = _interopRequireDefault(_dynamoClient);

var _optionsJson = require("../options.json");

var _optionsJson2 = _interopRequireDefault(_optionsJson);

describe(".dynamodb", function () {
    it("should return the default redis client when none is provided to the constructor options", function () {
        var historyService = new _lib2["default"]({
            redis: {},
            credentials: {
                dynamodb: {}
            }
        });
        historyService.dynamodb.should.be.instanceOf(function blah() {});
    });

    it("should pass the dynamodb client to the queing system", function () {
        var MockDynamoDB = function MockDynamoDB() {
            _classCallCheck(this, MockDynamoDB);
        };

        _optionsJson2["default"].dynamodb = new MockDynamoDB();

        var historyService = new _lib2["default"](_optionsJson2["default"]);

        historyService.dynamodb.should.be.instanceOf(MockDynamoDB);
    });
});