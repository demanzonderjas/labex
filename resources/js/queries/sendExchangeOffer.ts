import { API } from "../utils/api/axios";

export async function sendExchangeOffer(data) {
	console.log("sending offer..", data);
	try {
		const response = await API.post("exchange-offers/store", data);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
