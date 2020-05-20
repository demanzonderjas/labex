import { API } from "../utils/api/axios";

export async function sendExchangeRequest(data) {
	try {
		const response = await API.post("exchange-requests/store", data);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
