import { TExchangeAttempt } from "../typings/exchanges";
import { API } from "../utils/api/axios";

export async function createMatch(specifications: any, attemptId: string) {
	try {
		const response = await API.post(`exchange-attempt/match/${attemptId}`, {
			exchange_attempt: specifications
		});
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function connectMatch(connectingId: number, targetId: number) {
	try {
		const response = await API.post(`exchange-attempt/match/${targetId}`, {
			connecting_id: connectingId
		});
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
