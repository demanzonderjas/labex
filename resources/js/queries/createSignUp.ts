import { ExternalAPI } from "../utils/api/axios";

export async function createSignUp(data) {
	try {
		const response = await ExternalAPI.post("signups/store", data);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
