/* eslint-disable new-cap */

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = EventControllerShowSteps;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _appeal = require("appeal");

var _appeal2 = _interopRequireDefault(_appeal);

function EventControllerShowSteps() {

	/**
  * WHEN
  */

	this.When(/^a valid create event request is received$/, function (callback) {
		var _this = this;

		_appeal2["default"].post.url(this.url + "/events").data({
			name: "Bob",
			age: 46
		}).header("Content-Type", "application/vnd.api+json").results(function (error, response) {
			_this.response = response;
			callback(error);
		});
	});

	this.When(/^a create event request is received without designating json as the content type$/, function (callback) {
		var _this2 = this;

		_appeal2["default"].post.url(this.url + "/events").data({
			name: "Bob",
			age: 46
		}).results(function (error, response) {
			_this2.response = response;
			callback(error);
		});
	});

	this.When(/^a create event request is received with invalid json in the body$/, function (callback) {
		var _this3 = this;

		_appeal2["default"].post.url(this.url + "/events").data("NOT JSON DATA").header("Content-Type", "application/vnd.api+json").results(function (error, response) {
			_this3.response = response;
			callback(error);
		});
	});

	this.When(/^it designates json as the content type$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.When(/^the body is not valid json$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	/**
  * THEN
  */

	this.Then(/^add a create event task to the task queue$/, function (callback) {
		this.service.queue.inactiveCount(function (error, total) {
			total.should.equal(1);
			callback();
		});
	});
}

module.exports = exports["default"];