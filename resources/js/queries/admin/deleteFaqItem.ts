import { API } from "../../utils/api/axios";

export async function deleteFaqItem(itemId) {
	try {
		const response = await API.post(`faq-items/delete/${itemId}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
