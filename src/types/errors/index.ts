import { CommonError } from "./common";

export { CommonError };
export class NotFoundError extends CommonError {
	constructor(message = "not found") {
		super(message, 404);
	}
}
export class UnauthorizedError extends CommonError {
	constructor(message = "unauthorized") {
		super(message, 403);
	}
}
