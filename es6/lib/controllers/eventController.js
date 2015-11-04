import Controller from "forbin";
import privateData from "incognito";

/**
 * Controls requests for events
 *
 * @class EventController
 */
export default class EventController extends Controller {
    /**
     * Initialize the event controller by passing the history service object to it.
     *
     * @constructor
     * @method initialize
     * @param  {HistoryService} service The service that the controller works for.
     */
    initialize(service) {
        privateData(this).service = service;
    }

    /**
     * Insert a "Create Event" task into the tasks queue
     *
     * @method create
     * @param  {Request} request  The request sent in
     * @param  {Response} response A promise to respond with
     */
    create(request, response) {
        const queue = privateData(this).service.queue;

        queue
            .create("createEvent", request.body)
            .save();

        response.ok();
    }
}
