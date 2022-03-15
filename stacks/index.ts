import { App } from "@serverless-stack/resources";

import { ApiStack } from "./api";

const stage = process.env.STAGE ?? "local" as string;

export default function main(app: App): void {
	app.setDefaultFunctionProps({
		environment: {
			STAGE: stage,
			JWT_SECRET: process.env.JWT_SECRET ?? "secret",
			MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/chance-api-local",
			REDIS_PORT: process.env.REDIS_PORT ?? "6379",
			REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? "password",
			REDIS_DATABASE: process.env.REDIS_DATABASE ?? "0",
			REDIS_HOST: process.env.REDIS_HOST ?? "127.0.0.1"
		}
	});
	new ApiStack(app, "api");
}
