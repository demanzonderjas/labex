import { API } from "../../utils/api/axios";

export async function editFaqItem(item) {
    const { id } = item;
	try {
		const response = await API.post(`faq-items/edit/${id}`, item);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
