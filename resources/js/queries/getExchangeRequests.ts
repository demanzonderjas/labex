import { API } from "../utils/api/axios";

export async function getExchangeRequests() {
	try {
		const response = await API.get("exchange-requests");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
