import Redis from "ioredis";

import { config } from "./config";

export const redis = new Redis({
	host: config.REDIS_HOST,
	port: config.REDIS_PORT,
	db: config.REDIS_DATABASE,
	password: config.REDIS_PASSWORD
});

export async function set(key: string, data: any, options = { expiration: 3 }) {
	return redis.set(key, JSON.stringify(data), "ex", options.expiration);
}

export async function get<T>(key: string) {
	const data = await redis.get(key);
	if (!data) return null;
	return JSON.parse(data) as T;
}
