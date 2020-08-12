import { API } from "../utils/api/axios";

export async function getMyMatches() {
	try {
		const response = await API.get("my-matches");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
