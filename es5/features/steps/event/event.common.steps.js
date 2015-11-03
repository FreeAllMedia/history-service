/* eslint-disable new-cap */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = EventControllerCommonSteps;

function EventControllerCommonSteps() {
    this.Then(/^(?:with )?http status code "ok"$/, function (callback) {
        this.response.status.should.equal(200);
        callback();
    });

    this.Then(/^http status code "bad request"$/, function (callback) {
        this.response.status.should.equal(400);
        callback.pending();
    });

    this.Then(/^respond with a blank body$/, function (callback) {
        var error = undefined;

        /* Must check if blank, or undefined because of strange bug when setting json header on request */
        if (this.response.body !== "" && this.response.body !== undefined) {
            error = new Error("should have responded with a blank body, but instead responded with: " + this.response.body);
        }

        callback(error);
    });
}

module.exports = exports["default"];