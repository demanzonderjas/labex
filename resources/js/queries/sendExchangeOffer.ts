import { API } from "../utils/api/axios";

export async function sendExchangeOffer(data) {
	console.log("sending data", data);
	const response = await API.post("exchange-offers/store", data);
	return response;
}
