import { FastifyRequest } from "fastify";

import { verify, config } from "../services";
import { UnauthorizedError } from "../types";

export async function authenticate(req: FastifyRequest) {
	if (!req.headers.authorization) throw new UnauthorizedError();
	const token = req.headers.authorization.split("Bearer ")[1];
	if (!token) throw new UnauthorizedError();
	const { is_valid, stage } = verify<{ is_valid: boolean }>(token);
	if (!is_valid || stage !== config.STAGE) throw new UnauthorizedError();
	return;
}
