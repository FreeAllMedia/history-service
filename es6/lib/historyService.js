import EventRouter from "./routers/eventRouter.js";
import privateData from "incognito";
import kue from "kue";
import Redis from "ioredis";

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
	constructor(options = {}) {
		const _ = privateData(this);

		_.options = options;
		_.redis = _.options.redis || new Redis();
		_.router = new EventRouter(this);
		_.queue = kue.createQueue({
			redis: {
				createClientFactory: function(){
					return _.redis;
				}
			}
		});
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
	 * Returns the task queue for the service
	 *
	 * @property queue
	 * @return {Queue} The task queue object
	 */
	get queue() {
		return privateData(this).queue;
	}

	get redis() {
		return privateData(this).redis;
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
