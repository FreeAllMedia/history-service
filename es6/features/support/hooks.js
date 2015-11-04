/* eslint-disable new-cap */
import HistoryService from "../../lib/";
import mockRedis from "redis-js";

export default function hooks() {
	/* Called before each scenario */
	this.Before(function (event, callback) {
		const portNumber = 1338;

		this.url = `http:\/\/localhost:${portNumber}`;

		const mockRedisClient = mockRedis.createClient();

		this.service = new HistoryService({
			redis: mockRedisClient
		});

		this.service.listen(portNumber, () => {
			process.stdout.write(`\nTest service for features listening on port ${portNumber}\n`);
			callback();
		});
	});

	/* Called after all features are run */
	this.After(function (event, callback) {
		this.service.close(() => {
			process.stdout.write(`\nTest service closed.\n`);
			callback();
		});
	});
}
