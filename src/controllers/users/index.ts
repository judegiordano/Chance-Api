import { FastifyInstance } from "fastify";
import _ from "lodash";
import Chance from "chance";

import { user } from "../../models";
import { mockUsers, chance } from "../../services";
import { NotFoundError } from "../../types";

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
						_ids: {
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
		const inserted = await Promise.all(chunks.map((userChunk) => user.insertMany(userChunk)));
		const stats = inserted.reduce((acc, docs) => {
			const ids = docs.map(({ _id }) => _id);
			acc._ids.push(...ids);
			acc.count += ids.length;
			return acc;
		}, { count: 0, _ids: [] } as { count: number, _ids: string[] });
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
					},
					seed: { type: ["number", "string"] }
				}
			},
			response: {
				200: { $ref: "usersArray#" }
			}
		}
	}, async (req) => {
		const { count: limit } = req.query;
		const range = await user.count();
		const skip = chance.integer({ min: 1, max: range - limit });
		const users = await user.find({ _id: { $ne: null } }, null, { skip, limit, lean: true });
		return chance.shuffle(users);
	});
	app.get<{
		Querystring: {
			count: number
		},
		Params: {
			seed: number | string
		}
	}>("users/seed/:seed", {
		preValidation: [app.cache],
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
			params: {
				type: "object",
				properties: {
					seed: { type: ["number", "string"] }
				}
			},
			response: {
				200: { $ref: "usersArray#" }
			}
		}
	}, async (req) => {
		const { count: limit } = req.query;
		const { seed } = req.params;
		const chance = new Chance(seed);
		const range = await user.count();
		const skip = chance.integer({ min: 1, max: range - limit });
		const users = await user.find({ _id: { $ne: null } }, null, { skip, limit, lean: true });
		return chance.shuffle(users);
	});
	app.get<{
		Params: {
			id: number
		}
	}>("users/:id", {
		preValidation: [app.cache],
		schema: {
			params: {
				type: "object",
				required: ["id"],
				properties: {
					id: { type: "string" }
				}
			},
			response: {
				200: { $ref: "user#" }
			}
		}
	}, async (req) => {
		const { id } = req.params;
		const exists = await user.findById(id, null, { lean: true });
		if (!exists) throw new NotFoundError();
		return exists;
	});
};
