import HistoryService from "../lib/";
import Request from "appeal";

describe(".listen(portNumber, callback)", () => {
	it("should start the server on the designated port", done => {
        const historyService = new HistoryService();

        historyService.listen(8045, () => {
            Request
                .get
                .url("http://localhost:8045")
                .results((error) => {
                    error.message.should.not.eql("connect ECONNREFUSED 127.0.0.1:8045");
                    done();
                });
        });
    });
});
