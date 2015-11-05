import HistoryService from "../../lib/";
import kue from "kue";
import credentials from "../credentials.json";

const Queue = kue.createQueue().constructor;

describe(".queue", () => {
    it("should return an instance of a `kue` queue", () => {
        const historyService = new HistoryService({credentials: credentials});

        historyService.queue.should.be.instanceOf(Queue);
    });
});
