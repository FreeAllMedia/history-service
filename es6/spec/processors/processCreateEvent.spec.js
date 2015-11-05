import dynalite from "dynalite";
import processCreateEvent from "../../lib/processors/processCreateEvent.js";

describe(".processCreateEvent(job, callback)", () => {
    let dynamodbServer;

    before(done => {
        // Returns a standard Node.js HTTP server
        dynamodbServer = dynalite();

        // Listen on port 4567
        dynamodbServer.listen(4567, done);
    });

    after(done => {
        dynamodbServer.close(done);
    });

    it("should save job data ", () => {

    });
});
