import HistoryService from "../../lib/";
import Redis from "ioredis";

describe(".redis", () => {
    it("should return the default redis client when none is provided to the constructor options", () => {
        const historyService = new HistoryService();
        historyService.redis.should.be.instanceOf(Redis);
    });
});
