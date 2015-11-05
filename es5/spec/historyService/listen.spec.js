"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lib = require("../../lib/");

var _lib2 = _interopRequireDefault(_lib);

var _appeal = require("appeal");

var _appeal2 = _interopRequireDefault(_appeal);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _libProcessorsProcessCreateEventJs = require("../../lib/processors/processCreateEvent.js");

var _libProcessorsProcessCreateEventJs2 = _interopRequireDefault(_libProcessorsProcessCreateEventJs);

var _optionsJson = require("../options.json");

var _optionsJson2 = _interopRequireDefault(_optionsJson);

describe(".listen(portNumber, callback)", function () {
	var historyService = undefined,
	    portNumber = 8045;

	beforeEach(function (done) {
		historyService = new _lib2["default"](_optionsJson2["default"]);
		historyService.queue.process = _sinon2["default"].spy();
		historyService.listen(portNumber, done);
	});

	afterEach(function (done) {
		historyService.close(done);
	});

	it("should start the server on the designated port", function (done) {
		_appeal2["default"].get.url("http://localhost:8045").results(function (error, response) {
			response.body.should.eql("Cannot GET /\n");
			done();
		});
	});

	it("should start the create event processor", function () {
		historyService.queue.process.calledWith("createEvent", _libProcessorsProcessCreateEventJs2["default"]).should.be["true"];
	});
});