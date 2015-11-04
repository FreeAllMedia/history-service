import Router from "omnirouter";

import EventController from "../controllers/eventController.js";

export default class EventRouter extends Router {
    initialize(service) {
        const eventController = new EventController(service);

        this.post("/events", eventController.create);
    }
}
