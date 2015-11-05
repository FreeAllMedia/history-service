import HistoryService from "../../lib/";
import kue from "kue";
import options from "../options.json";

const Queue = kue.createQueue().constructor;

describe(".queue", () => {
    it("should return an instance of a `kue` queue", () => {
        const historyService = new HistoryService(options);

        historyService.queue.should.be.instanceOf(Queue);
    });
});
