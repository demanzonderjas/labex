import { API } from "../utils/api/axios";

export async function getExchangeRequests() {
	try {
		const response = await API.get("exchange-requests");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function getExchangeRequest(id: string) {
	try {
		const response = await API.get(`exchange-request/${id}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function getMyLatestExchangeRequests() {
	try {
		const response = await API.get(`exchange-requests/my-latest`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function getAllMyExchangeRequests() {
	try {
		const response = await API.get(`exchange-requests/my-all`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
