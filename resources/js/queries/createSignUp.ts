import { API, ExternalAPI } from "../utils/api/axios";

export async function createSignUp(data) {
	try {
		const response = await ExternalAPI.post("users/store", data);
		return response.data;
	} catch (e) {
		return { success: false, message: e.message || "invalid_request" };
	}
}

export async function resendEmailVerification() {
	try {
		const response = await API.post("email/verification-notification");
		return response.data;
	} catch (e) {
		return { success: false, message: e.message || "invalid_request" };
	}
}
