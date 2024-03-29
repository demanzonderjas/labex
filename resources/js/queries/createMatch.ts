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
