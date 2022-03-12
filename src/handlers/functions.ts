import { sign } from "../services";

type Payload = { is_valid: boolean }

export async function createToken() {
	return {
		statusCode: 200,
		headers: { "Content-Type": "application/json" },
		body: sign<Payload>({ is_valid: true }),
	};
}
