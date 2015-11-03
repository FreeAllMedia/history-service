/* eslint-disable new-cap */

export default function EventControllerCommonSteps () {
    this.Then(/^(?:with )?http status code "ok"$/, function (callback) {
        this.response.status.should.equal(200);
        callback();
    });

    this.Then(/^http status code "bad request"$/, function (callback) {
      this.response.status.should.equal(400);
      callback.pending();
    });

    this.Then(/^respond with a blank body$/, function (callback) {
        let error;

        /* Must check if blank, or undefined because of strange bug when setting json header on request */
        if (this.response.body !== "" && this.response.body !== undefined) {
            error = new Error(`should have responded with a blank body, but instead responded with: ${this.response.body}`);
        }

        callback(error);
    });
}
