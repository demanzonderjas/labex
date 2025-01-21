import { API } from "../../utils/api/axios";

export async function approveAttempt(attemptId: number) {
	try {
		const response = await API.post(`exchange-attempts/approve/${attemptId}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
