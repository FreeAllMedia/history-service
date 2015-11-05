import HistoryService from "../../lib/";
import Redis from "ioredis";
import credentials from "../credentials.json";

describe(".redis", () => {
    it("should return the default redis client when none is provided to the constructor options", () => {
        const historyService = new HistoryService({credentials: credentials});
        historyService.redis.should.be.instanceOf(Redis);
    });
});
