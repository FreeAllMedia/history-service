import EventRouter from "./routers/eventRouter.js";
import privateData from "incognito";
import kue from "kue";
import Redis from "ioredis";
import MultiError from "blunder";
import dynamo from "dynamo-client";

const 	validateOptions = Symbol(),
		callExternalMethod = Symbol(),
		startProcessors = Symbol();

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

		this[validateOptions](options);

		_.redis = _.options.redis || new Redis(_.options.credentials.redis);
		_.router = new EventRouter(this);
		_.dynamodb = _.options.dynamodb || dynamo.createClient(_.options.credentials.dynamodb);

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
		this[startProcessors]();
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

	/**
	 * Return the redis client in use
	 *
	 * @property redis
	 * @return {*} The redis client in use
	 */
	get redis() {
		return privateData(this).redis;
	}

	/**
	 * Return the DynamoDB client in use
	 *
	 * @property dynamodb
	 * @return {*} The DynamoDB client in use
	 */
	get dynamodb() {
		return privateData(this).dynamodb;
	}

	/**
	 * Validates that all options are set correctly.
	 *
	 * @method validateOptions
	 * @private
	 * @param  {Object} options The options object to be checked for validity.
	 */
	[validateOptions](options) {
		const _ = privateData(this);

		options.credentials = options.credentials || {};

		let errors = [];

		if (!options.redis && !options.credentials.redis) {
			errors.push(new Error("A Redis client or credentials are required."));
		}

		if (!options.dynamodb && !options.credentials.dynamodb) {
			errors.push(new Error("A DynamoDB client or credentials are required."));
		}

		if (errors.length > 0) {
			throw new MultiError(errors);
		}

		_.options = options;
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

	/**
	 * Start processing jobs in the Queue
	 *
	 * @method startProcessors
	 * @private
	 */
	[startProcessors]() {
		const queue = privateData(this).queue;
		queue.process("createEvent", function (event, done) {
			done();
		});
	}
}
