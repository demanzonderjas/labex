import { API } from "../utils/api/axios";

export async function createRequestMatch(offer: any, requestId: string) {
	try {
		const response = await API.post(`exchange-request/match/${requestId}`, {
			exchange_offer: offer
		});
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
