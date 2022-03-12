import mongoose, { connect } from "mongoose";

import { config } from "./config";

const connection = {
	isConnected: 0
};

export async function createConnection() {
	if (connection.isConnected === 1) return;
	const { connections } = await connect(config.MONGO_URI, {
		autoCreate: true,
		autoIndex: true,
		keepAlive: true,
		socketTimeoutMS: 2000000,
		maxPoolSize: 5,
	});
	connection.isConnected = connections[0].readyState;
}

export async function closeConnection() {
	return mongoose.connection.close();
}
