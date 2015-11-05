import HistoryService from "../../lib/";
import Redis from "ioredis";

describe(".redis", () => {
    it("should return the default redis client when none is provided to the constructor options", () => {
        const historyService = new HistoryService({
            dynamodb: {},
            credentials: {
                redis: {}
            }
        });
        historyService.redis.should.be.instanceOf(Redis);
    });

    it("should pass the redis client to the queing system", () => {
        class MockRedis {}

        const options = {
            redis: new MockRedis(),
            dynamodb: {}
        };

        const historyService = new HistoryService(options);

        historyService.redis.should.be.instanceOf(MockRedis);
    });
});
