import { API } from "../utils/api/axios";

export async function getFAQ() {
	try {
		const response = await API.get("faq");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
