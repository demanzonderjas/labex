import { API } from "../utils/api/axios";

export async function deleteAttemptQuery(id: number) {
	try {
		const response = await API.post(`exchange-attempt/${id}/delete`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
