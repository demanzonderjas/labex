import { API } from "../../utils/api/axios";

export async function createFaqItem(item) {
	try {
		const response = await API.post("faq-items/create", item);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
