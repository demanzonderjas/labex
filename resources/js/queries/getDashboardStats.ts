import { API } from "../utils/api/axios";

export async function getDashboardStats() {
	try {
		const response = await API.get("dashboard-stats");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
