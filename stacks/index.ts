import { App } from "@serverless-stack/resources";

import { ApiStack } from "./api";

const stage = process.env.STAGE ?? "local" as string;

export default function main(app: App): void {
	app.setDefaultFunctionProps({
		environment: {
			STAGE: stage,
			JWT_SECRET: process.env.JWT_SECRET ?? "secret",
			MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/chance-api-local"
		}
	});
	new ApiStack(app, "api");
}
