import { API } from "../utils/api/axios";

export async function deleteExchangeOffer(id: number) {
	try {
		const response = await API.post(`exchange-offer/${id}/delete`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
