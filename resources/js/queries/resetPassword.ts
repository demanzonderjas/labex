import { ExternalAPI } from "../utils/api/axios";

export async function resetPassword({ email }) {
	try {
		const response = await ExternalAPI.post("users/reset-password", { email });
		return response.data;
	} catch (e) {
		return { success: false, message: e.message || "invalid_request" };
	}
}

export async function changePassword(data) {
	try {
		return ExternalAPI.post("users/change-password", data)
			.then((r) => r.data)
			.catch((err) => ({ success: false, message: err.response.data.message }));
	} catch (e) {
		return { success: false, message: e.message || "invalid_request" };
	}
}
