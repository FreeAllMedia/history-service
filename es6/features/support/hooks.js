/* eslint-disable new-cap */
import HistoryService from "../../lib/";
import mockRedis from "redis-js"; // Sounds like actual Redis client, but is actually a mock library

import environments from "../../../environments.json";

export default function hooks() {
	/* Called before each scenario */
	this.Before(function (event, callback) {
		const portNumber = 1338;

		this.url = `http:\/\/localhost:${portNumber}`;

		/**
		 * WARNING
		 *
		 * This mockRedis library (`redis-js`) will return a client that is always
		 * connected to the same database. So, you will need to clear all keys from
		 * the mockRedis database in order to ensure that no tests contaminate the others.
		 */
		this.mockRedisClient = mockRedis.createClient();

		this.service = new HistoryService({
			redis: this.mockRedisClient,
			dynamodb: {}
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

			this.mockRedisClient.flushall(() => {
				process.stdout.write(`\nMock redis database flushed.\n`);

				callback();
			});
		});
	});
}
