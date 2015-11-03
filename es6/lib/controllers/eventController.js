import Controller from "forbin";

export default class EventController extends Controller {
    /**
     * Insert a "Create Event" task into the tasks queue
     *
     * @method create
     * @param  {Request} request  The request sent in
     * @param  {Response} response A promise to respond with
     */
    create(request, response) {
        response.ok();
    }
}
