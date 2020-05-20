import { API } from "../utils/api/axios";

export async function getExchangeOffers() {
	try {
		const response = await API.get("exchange-offers");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
