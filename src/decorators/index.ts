import { FastifyReply, FastifyRequest } from "fastify";

import { verify, config, redis } from "../services";
import { UnauthorizedError } from "../types";

export async function authenticate(req: FastifyRequest) {
	if (!req.headers.authorization) throw new UnauthorizedError();
	const token = req.headers.authorization.split("Bearer ")[1];
	if (!token) throw new UnauthorizedError();
	const { is_valid, stage } = verify<{ is_valid: boolean }>(token);
	if (!is_valid || stage !== config.STAGE) throw new UnauthorizedError();
	return;
}

export async function cache(req: FastifyRequest, res: FastifyReply) {
	const key = `${req.method}-${req.url}-${req.ip}`;
	const data = await redis.get(key);
	if (!data) {
		req.cache = {
			...req.cache,
			shouldCache: true,
			key
		};
		return;
	}
	req.cache = {
		...req.cache,
		shouldCache: false,
		key: null
	};
	return res.send(data);
}
