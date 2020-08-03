import { API } from "../utils/api/axios";

export async function createOfferMatch(request: any, offerId: string) {
	try {
		const response = await API.post(`exchange-offer/match/${offerId}`, {
			exchange_request: request
		});
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
