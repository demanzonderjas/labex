import { API } from "../utils/api/axios";

export async function sendExchangeAttempt(data: any) {
	try {
		const response = await API.post("exchange-attempt/store", data);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
