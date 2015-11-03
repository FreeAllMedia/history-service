import Router from "omnirouter";

import EventController from "../controllers/eventController.js";

export default class EventRouter extends Router {
    initialize() {
        const eventController = new EventController();

        this.post("/events", eventController.create);
    }
}
