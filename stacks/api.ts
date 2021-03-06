import { Stack, App, StackProps, Api, Function } from "@serverless-stack/resources";

export class ApiStack extends Stack {
	constructor(scope: App, id: string, props?: StackProps) {
		super(scope, id, props);

		const api = new Api(this, "api", {
			cors: {
				allowHeaders: ["Authorization"]
			},
			routes: {
				"$default": "src/handlers/index.run",
			}
		});

		new Function(this, "create-token", {
			handler: "src/handlers/functions.createToken",
		});

		this.addOutputs({
			endpoint: process.env.IS_LOCAL ? api.url : "xxxxxx"
		});
	}
}
