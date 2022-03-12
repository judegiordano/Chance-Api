import { FastifyRequest, FastifyReply } from "fastify";

import { verify, config } from "../services";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
	if (!req.headers.authorization) {
		res.statusCode = 401;
		throw new Error("unauthorized");
	}
	const token = req.headers.authorization.split("Bearer ")[1];
	if (!token) {
		res.statusCode = 401;
		throw new Error("unauthorized");
	}
	const { is_valid, stage } = verify<{ is_valid: boolean }>(token);
	if (!is_valid || stage !== config.STAGE) {
		res.statusCode = 401;
		throw new Error("unauthorized");
	}
	return;
}
