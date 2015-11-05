import HistoryService from "../../lib/";

describe("options.redis", () => {
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
