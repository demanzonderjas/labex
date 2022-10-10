import { API } from "../../utils/api/axios";

export async function approveMatch(matchId) {
	try {
		const response = await API.post(`matches/approve/${matchId}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function rejectMatch(matchId: number, message: string) {
	try {
		const response = await API.post(`matches/reject/${matchId}`, { message });
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
