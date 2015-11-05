import HistoryService from "../../lib/";
import dynamo from "dynamo-client";
import options from "../options.json";

describe(".dynamodb", () => {
    it("should return the default redis client when none is provided to the constructor options", () => {
        const historyService = new HistoryService({
            redis: {},
            credentials: {
                dynamodb: {}
            }
        });
        historyService.dynamodb.should.be.instanceOf(function blah() {});
    });

    it("should pass the dynamodb client to the queing system", () => {
        class MockDynamoDB {}

        options.dynamodb = new MockDynamoDB();

        const historyService = new HistoryService(options);

        historyService.dynamodb.should.be.instanceOf(MockDynamoDB);
    });
});
