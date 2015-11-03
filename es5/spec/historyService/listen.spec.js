"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lib = require("../lib/");

var _lib2 = _interopRequireDefault(_lib);

var _appeal = require("appeal");

var _appeal2 = _interopRequireDefault(_appeal);

describe(".listen(portNumber, callback)", function () {
    it("should start the server on the designated port", function (done) {
        var historyService = new _lib2["default"]();

        historyService.listen(8045, function () {
            _appeal2["default"].get.url("http://localhost:8045").results(function (error) {
                error.message.should.not.eql("connect ECONNREFUSED 127.0.0.1:8045");
                done();
            });
        });
    });
});