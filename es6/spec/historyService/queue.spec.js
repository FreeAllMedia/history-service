import HistoryService from "../../lib/";

import kue from "kue";

const Queue = kue.createQueue().constructor;

describe(".queue", () => {
    it("should return an instance of a `kue` queue", () => {
        const historyService = new HistoryService();

        historyService.queue.should.be.instanceOf(Queue);
    });
});
