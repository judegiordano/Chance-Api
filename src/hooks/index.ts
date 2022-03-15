import { FastifyReply, FastifyRequest } from "fastify";

import { redis } from "../services";

export async function onSend(req: FastifyRequest, _: FastifyReply, payload: unknown) {
	if (req.cache?.shouldCache && req.cache?.key) await redis.set(req.cache.key, JSON.parse(payload as string));
	return;
}
