export const config = {
	STAGE: process.env.STAGE as string,
	JWT_SECRET: process.env.JWT_SECRET as string,
	MONGO_URI: process.env.MONGO_URI as string
};
