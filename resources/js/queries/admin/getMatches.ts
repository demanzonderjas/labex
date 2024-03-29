import { API } from "../../utils/api/axios";

export async function getMatches() {
	try {
		const response = await API.get("matches");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
