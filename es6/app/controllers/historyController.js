import ApplicationController from "./applicationController.js";
import History from "../models/history.js";
import MultiError from "blunder";
import {isAssigned} from "proven";
import {BadRequestError} from "../errors.js";

const validateId = Symbol("validateId"),
	validateData = Symbol("validateData");

export default class HistoryController extends ApplicationController {
	filters() {
		this.before([this.show, this.delete, this.update], this[validateId]);
		this.before([this.create, this.update], this[validateData]);
	}

	show(request, response) {
		let history = new History({id: request.params.id});
		history.fetch((fetchError) => {
			if(fetchError) {
				response.notFound(fetchError);
			} else {
				response.ok(history.toJSON());
			}
		});
	}

	create(request, response) {
		let newHistory = new History({
			contentPackageId: request.body.data.contentPackageId,
			name: request.body.data.name
		});

		newHistory.save((saveError) => {
			if(saveError) {
				response.conflict(saveError);
			} else {
				response.created(newHistory.toJSON());
			}
		});
	}

	update(request, response) {
		let history = new History();
		history.id = request.params.id;
		history
		.fetch((fetchError) => {
			if(fetchError) {
				response.notFound(fetchError);
			} else {
				history.contentPackageId = request.body.data.contentPackageId;
				history.name = request.body.data.name;

				history.save((saveError) => {
					if(saveError) {
						response.conflict(saveError);
					} else {
						response.ok(history.toJSON());
					}
				});
			}
		});
	}

	delete(request, response) {
		let history = new History({id: request.params.id});
		history.fetch((fetchError) => {
			if(fetchError) {
				response.notFound(fetchError);
			} else {
				history.delete((deleteError) => {
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
		History
			.find
			.all
			.results((errors, Historys) => {
				if(errors) {
					let multiError = new MultiError(errors);
					response.conflict(multiError);
				} else {
					let result = Historys.map((value) => {
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
