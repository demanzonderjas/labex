import { TExchangeAttemptType } from "../typings/exchanges";
import { API } from "../utils/api/axios";

export async function getExchangeAttempts(attempt_type: TExchangeAttemptType, adminView?: boolean) {
	try {
		const response = await API.post("exchange-attempts", {
			attempt_type,
			admin_view: adminView
		});
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

export async function getMyLatestExchangeAttempts() {
	try {
		const response = await API.post(`exchange-attempts/mine-latest`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function getMyRequests() {
	try {
		const response = await API.post(`exchange-attempts/requests/mine`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
