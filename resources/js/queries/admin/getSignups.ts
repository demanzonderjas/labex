import { API } from "../../utils/api/axios";

export async function getSignups() {
	try {
		const response = await API.get("signups");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}