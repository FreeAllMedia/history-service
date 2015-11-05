import HistoryService from "../../lib/";
import Request from "appeal";
import sinon from "sinon";
import processCreateEvent from "../../lib/processors/processCreateEvent.js";
import credentials from "../credentials.json";

describe(".listen(portNumber, callback)", () => {
	let historyService,
		portNumber = 8045;

	beforeEach(done => {
		historyService = new HistoryService({credentials: credentials});
		historyService.queue.process = sinon.spy();
		historyService.listen(portNumber, done);
	});

	afterEach(done => {
		historyService.close(done);
	});

	it("should start the server on the designated port", done => {
		Request
			.get
			.url("http://localhost:8045")
			.results((error, response) => {
				response.body.should.eql("Cannot GET /\n");
				done();
			});
	});

	it("should start the create event processor", () => {
		historyService.queue.process.calledWith("createEvent", processCreateEvent).should.be.true;
	});
});
