import { FastifyInstance } from "fastify";
import plugin from "fastify-plugin";

export const schemas = plugin(async function (app: FastifyInstance) {
	app.addSchema({
		$id: "ping",
		type: "object",
		properties: {
			ok: { type: "boolean" }
		}
	});
	app.addSchema({
		$id: "user",
		type: "object",
		properties: {
			_id: { type: "string" },
			profile: {
				type: "object",
				properties: {
					name: { type: "string" },
					gender: { type: "string" },
					birthday: { type: "string" },
					profession: { type: "string" },
					social_last_four: { type: "string" },
					profile_url: { type: "string" }
				}
			},
			contact: {
				type: "object",
				properties: {
					phone: { type: "string" },
					email: { type: "string" }
				}
			},
			address: {
				type: "object",
				properties: {
					street: { type: "string" },
					city: { type: "string" },
					country: { type: "string" }
				}
			},
			updated_at: { type: "string" },
			created_at: { type: "string" },
			is_deleted: { type: "number" },
		}
	});
	app.addSchema({
		$id: "usersArray",
		type: "array",
		items: { $ref: "user#" }
	});
});
