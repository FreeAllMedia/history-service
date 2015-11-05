"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _dynalite = require("dynalite");

var _dynalite2 = _interopRequireDefault(_dynalite);

var _libProcessorsProcessCreateEventJs = require("../../lib/processors/processCreateEvent.js");

var _libProcessorsProcessCreateEventJs2 = _interopRequireDefault(_libProcessorsProcessCreateEventJs);

describe(".processCreateEvent(job, callback)", function () {
    var dynamodbServer = undefined;

    before(function (done) {
        // Returns a standard Node.js HTTP server
        dynamodbServer = (0, _dynalite2["default"])();

        // Listen on port 4567
        dynamodbServer.listen(4567, done);
    });

    after(function (done) {
        dynamodbServer.close(done);
    });

    it("should save job data ");
});