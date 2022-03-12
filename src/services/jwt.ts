import jwt from "jsonwebtoken";

import { config } from "./config";

export function sign<T>(payload: T) {
	return jwt.sign({ ...payload, stage: config.STAGE }, config.JWT_SECRET);
}

export function verify<T>(token: string) {
	return jwt.verify(token, config.JWT_SECRET) as T & { stage: string };
}
