import { API } from "../../utils/api/axios";

export async function getFaqItems() {
	try {
		const response = await API.get("faq-items");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function getFaqItem(id) {
	try {
		const response = await API.get(`faq-items/${id}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}