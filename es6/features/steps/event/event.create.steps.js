/* eslint-disable new-cap */

import sinon from "sinon";

import Request from "appeal";

export default function EventControllerShowSteps () {

	/**
	 * WHEN
	 */

	this.When(/^a valid create event request is received$/, function (callback) {
		Request
			.post
			.url(this.url + "/events")
			.data({
				name: "Bob",
				age: 46
			})
			.header("Content-Type", "application/vnd.api+json")
			.results((error, response) => {
				this.response = response;
				callback(error);
			});
	});

	this.When(/^a create event request is received without designating json as the content type$/, function (callback) {
		Request
			.post
			.url(this.url + "/events")
			.data({
				name: "Bob",
				age: 46
			})
			.results((error, response) => {
				this.response = response;
				callback(error);
			});
	});

	this.When(/^a create event request is received with invalid json in the body$/, function (callback) {
		Request
			.post
			.url(this.url + "/events")
			.data("NOT JSON DATA")
			.header("Content-Type", "application/vnd.api+json")
			.results((error, response) => {
				this.response = response;
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
		this.service.queue.inactiveCount((err, total) => {
			total.should.equal(1);
			callback();
		});
    });

}
