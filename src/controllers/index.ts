import { FastifyPluginCallback } from "fastify";

import { app } from "../services";
import { developer } from "./developer";

const routers = [
	developer
] as unknown as FastifyPluginCallback[];

for (const router of routers) {
	app.register(router, { prefix: "/api/" });
}

export const controllers = app;
