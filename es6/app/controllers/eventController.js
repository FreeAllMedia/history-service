import ApplicationController from "./applicationController.js";
import Event from "../models/event.js";
import MultiError from "blunder";
import {isAssigned} from "proven";
import {BadRequestError} from "../errors.js";

const validateId = Symbol("validateId"),
	validateData = Symbol("validateData");

export default class EventController extends ApplicationController {
	filters() {
		this.before([this.show, this.delete, this.update], this[validateId]);
		this.before([this.create, this.update], this[validateData]);
	}

	show(request, response) {
		let event = new Event({id: request.params.id});
		event.fetch((fetchError) => {
			if(fetchError) {
				response.notFound(fetchError);
			} else {
				response.ok(event.toJSON());
			}
		});
	}

	create(request, response) {
		let newEvent = new Event({
			contentPackageId: request.body.data.contentPackageId,
			name: request.body.data.name
		});

		newEvent.save((saveError) => {
			if(saveError) {
				response.conflict(saveError);
			} else {
				response.created(newEvent.toJSON());
			}
		});
	}

	update(request, response) {
		let event = new Event();
		event.id = request.params.id;
		event
		.fetch((fetchError) => {
			if(fetchError) {
				response.notFound(fetchError);
			} else {
				event.contentPackageId = request.body.data.contentPackageId;
				event.name = request.body.data.name;

				event.save((saveError) => {
					if(saveError) {
						response.conflict(saveError);
					} else {
						response.ok(event.toJSON());
					}
				});
			}
		});
	}

	delete(request, response) {
		let event = new Event({id: request.params.id});
		event.fetch((fetchError) => {
			if(fetchError) {
				response.notFound(fetchError);
			} else {
				event.delete((deleteError) => {
					if(deleteError) {
						response.internalServerError(deleteError);
					} else {
						response.noContent();
					}
				});
			}
		});
	}

	list(request, response) {
		Event
			.find
			.all
			.results((errors, Events) => {
				if(errors) {
					let multiError = new MultiError(errors);
					response.conflict(multiError);
				} else {
					let result = Events.map((value) => {
						return value.toJSON();
					});
					response.ok(result);
				}
			});
	}

	[validateId](request, response, next) {
		if(request.params.id > 0) {
			next();
		} else {
			let error = new BadRequestError();
			response.badRequest(error);
			next(error);
		}
	}

	[validateData](request, response, next) {
		if(isAssigned.call(request.body, "data").result) {
			next();
		} else {
			let error = new BadRequestError();
			response.badRequest(error);
			next(error);
		}
	}
}
