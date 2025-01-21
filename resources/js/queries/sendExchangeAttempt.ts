import { API } from "../utils/api/axios";

export async function sendExchangeAttempt(data: any) {
	try {
		const response = await API.post("exchange-attempt/store", data);
		return response.data;
	} catch (e) {
		console.log("error", e);
		return { success: false, message: "invalid_request" };
	}
}

export async function updateExchangeAttempt(id: string, data: any) {
	try {
		const response = await API.post(`exchange-attempt/${id}/update`, data);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
