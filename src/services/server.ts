import Fastify, { FastifyError, FastifyRequest, FastifyReply } from "fastify";
import helmet from "fastify-helmet";

import { schemas } from "../middleware";

export const app = Fastify({
	logger: true,
	maxParamLength: 100,
	bodyLimit: 256 * 1024 * 1, // 256KB
	caseSensitive: true,
	return503OnClosing: true,
	onProtoPoisoning: "error",
	onConstructorPoisoning: "error"
});
app.register(schemas);
app.register(helmet);
app.setErrorHandler(async (error: FastifyError, req: FastifyRequest, res: FastifyReply) => {
	req.log.error(error, error.stack);
	return {
		ok: false,
		status: res.statusCode ?? 500,
		error: error.message ?? "internal server error"
	};
});
