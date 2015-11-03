/* eslint-disable new-cap */
import Service from "../../lib/";

export default function hooks() {
	let service,
		portNumber = 1338;

	/* Called once before all features are run */
	this.BeforeFeatures(function (scenario, callback) {
		service = new Service();
		service.listen(portNumber, () => {
			process.stdout.write(`\nTest service for features listening on port ${portNumber}\n`);
			callback();
		});
	});

	/* Called before each scenario */
	this.Before(function () {
		this.url = `http:\/\/localhost:${portNumber}`;
	});

	/* Called after all features are run */
	this.AfterFeatures(function (scenario, callback) {
		service.close(() => {
			process.stdout.write(`\nTest service closed.\n`);
			callback();
		});
	});
}
