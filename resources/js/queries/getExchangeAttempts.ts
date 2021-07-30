import { TExchangeAttemptType } from "../typings/Base";
import { API } from "../utils/api/axios";

export async function getExchangeAttempts(attempt_type: TExchangeAttemptType) {
	try {
		const response = await API.post("exchange-attempts", { attempt_type });
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function getExchangeAttempt(id: string) {
	try {
		const response = await API.get(`exchange-attempt/${id}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function getMyLatestExchangeAttempts(attempt_type: TExchangeAttemptType) {
	try {
		const response = await API.post(`exchange-attempts/mine-latest`, { attempt_type });
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
