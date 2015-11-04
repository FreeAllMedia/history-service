import HistoryService from "../../lib/";
import Request from "appeal";

describe(".listen(portNumber, callback)", () => {
	it("should start the server on the designated port", done => {
        const historyService = new HistoryService();

        historyService.listen(8045, () => {
			Request
                .get
                .url("http://localhost:8045")
                .results((error, response) => {
					response.body.should.eql("Cannot GET /\n");

					historyService.close(done);
                });
        });
    });
});
