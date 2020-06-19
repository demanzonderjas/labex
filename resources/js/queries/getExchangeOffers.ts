import { API } from "../utils/api/axios";

export async function getExchangeOffers() {
	try {
		const response = await API.get("exchange-offers");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function getExchangeOffer(id: string) {
	try {
		const response = await API.get(`exchange-offer/${id}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
