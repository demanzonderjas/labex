import { API } from "../utils/api/axios";

export async function sendExchangeRequest(data) {
	console.log("sending data", data);
	const response = await API.post("exchange-requests/store", data);
	return response;
}
