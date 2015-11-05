import HistoryService from "../../lib/";
import Request from "appeal";
import credentials from "../credentials.json";

describe(".close(callback)", () => {
	it("should stop the server from listening for requests", done => {
        const historyService = new HistoryService({credentials: credentials});

        historyService.listen(8045, () => {
            historyService.close(() => {
                Request
                    .get
                    .url("http://localhost:8045")
                    .results((error) => {
                        error.message.should.eql("connect ECONNREFUSED 127.0.0.1:8045");
                        done();
                    });
            });
        });
    });
});
