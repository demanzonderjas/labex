import { API } from "../../utils/api/axios";

export async function approveMatch(matchId) {
	try {
		const response = await API.post(`matches/approve/${matchId}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function rejectMatch(matchId) {
	try {
		const response = await API.post(`matches/reject/${matchId}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
