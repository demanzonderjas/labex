import { API } from "../utils/api/axios";

export async function deleteExchangeRequest(id: number) {
	try {
		const response = await API.post(`exchange-request/${id}/delete`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
