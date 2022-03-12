import axios from "axios";

export const faceApi = axios.create({
	baseURL: "https://random-face-generator-proxy.herokuapp.com/https://fakeface.rest/face",
	headers: {
		"origin": ""
	}
});
