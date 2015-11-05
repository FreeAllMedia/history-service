import HistoryService from "../../lib/";

describe(".constructor", () => {
    let historyService;

    describe("(when both options.credentials.redis and options.redis are not set)", () => {
        it("should return an error with message 'A Redis client or credentials are required.'", () => {
            () => {
                historyService = new HistoryService({
                    dynamodb: {}
                });
            }.should.throw("Error: A Redis client or credentials are required.");
        });
    });

    describe("(when both options.credentials.dynamodb and options.dynamodb are not set)", () => {
        it("should return an error with message 'A DynamoDB client or credentials are required.'", () => {
            () => {
                historyService = new HistoryService({
                    redis: {}
                });
            }.should.throw("Error: A DynamoDB client or credentials are required.");
        });
    });

    describe("(when options.credentials.dynamodb, options.dynamodb, options.credentials.redis, and options.redis are not set)", () => {
        it("should return an error with message 'A DynamoDB client or credentials are required., A Redis client or credentials are required.'", () => {
            () => {
                historyService = new HistoryService();
            }.should.throw("Error: A Redis client or credentials are required., A DynamoDB client or credentials are required.");
        });
    });
});
