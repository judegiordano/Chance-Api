import { FastifyInstance } from "fastify";
import _ from "lodash";

import { userService } from "../../models";
import { mockUsers, chance } from "../../services";

export const users = async function (app: FastifyInstance) {
	app.post<{
		Querystring: {
			count: number
		}
	}>("users", {
		preValidation: [app.authenticate],
		schema: {
			querystring: {
				type: "object",
				properties: {
					count: {
						type: "number",
						minimum: 1,
						maximum: 100,
						default: 5
					}
				}
			},
			response: {
				200: {
					type: "object",
					properties: {
						count: { type: "number" },
						ids: {
							type: "array",
							items: { type: "string" }
						}
					}
				}
			}
		}
	}, async (req) => {
		const { count } = req.query;
		const users = await mockUsers(count);
		const chunks = _.chunk(users, 50);
		const inserted = await Promise.all(chunks.map((userChunk) => userService.insertMany(userChunk)));
		const stats = inserted.reduce((acc: { count: number, ids: string[] }, docs) => {
			const ids = docs.map(({ _id }) => _id);
			acc.ids.push(...ids);
			acc.count += ids.length;
			return acc;
		}, { count: 0, ids: [] });
		return stats;
	});
	app.get<{
		Querystring: {
			count: number
		}
	}>("users", {
		schema: {
			querystring: {
				type: "object",
				properties: {
					count: {
						type: "number",
						minimum: 1,
						maximum: 100,
						default: 5
					}
				}
			},
			response: {
				200: { $ref: "usersArray#" }
			}
		}
	}, async (req) => {
		const { count: limit } = req.query;
		const range = await userService.count();
		const skip = chance.integer({ min: 1, max: range - limit });
		const users = await userService.find({ _id: { $ne: null } }, null, { skip, limit });
		return chance.shuffle(users);
	});
};
