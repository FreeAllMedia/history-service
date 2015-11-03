import EventRouter from "./routers/eventRouter.js";
import privateData from "incognito";

const callExternalMethod = Symbol();

/**
 * @class HistoryService
 */
export default class HistoryService {

	/**
	 * Setup the router in private data
	 *
	 * @constructor
	 */
	constructor() {
		privateData(this).router = new EventRouter();
	}

	/**
	 * Start the service listening on the designated port.
	 *
	 * @method listen
	 * @param  {Number}   portNumber Port number for the service to listen on.
	 * @param  {Function} callback   Function to be called when the service is ready and listening.
	 */
	listen(portNumber, callback) {
		this[callExternalMethod]("./historyService/listen.js", portNumber, callback);
	}

	/**
	 * Close the service down
	 *
	 * @method close
	 * @param  {Function} callback Function to be called when the service is fully closed.
	 */
	close(callback) {
		this[callExternalMethod]("./historyService/close.js", callback);
	}

	/**
	 * Call an external method with `this` as the context.
	 *
	 * @method callExternalMethod
	 * @param  {String} filePath           	The file path to the external method
	 * @param  {*}		...methodArguments 	Any arguments that are to be passed to the external method
	 * @private
	 */
	[callExternalMethod](filePath, ...methodArguments) {
		require(filePath).call(this, ...methodArguments);
	}
}
