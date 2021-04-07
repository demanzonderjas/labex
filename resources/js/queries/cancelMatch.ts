import { API } from "../utils/api/axios";

export async function cancelMatch(matchId) {
	try {
		const response = await API.post(`matches/cancel/${matchId}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
