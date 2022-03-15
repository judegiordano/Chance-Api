export const config = {
	STAGE: process.env.STAGE as string,
	JWT_SECRET: process.env.JWT_SECRET as string,
	MONGO_URI: process.env.MONGO_URI as string,
	REDIS_PORT: parseInt(process.env.REDIS_PORT as string),
	REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
	REDIS_DATABASE: parseInt(process.env.REDIS_DATABASE as string),
	REDIS_HOST: process.env.REDIS_HOST as string
};
