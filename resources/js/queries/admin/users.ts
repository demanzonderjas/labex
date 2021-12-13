import { API } from "../../utils/api/axios";

export async function getUsers() {
	try {
		const response = await API.get("users");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function createUser(user) {
	try {
		const response = await API.post("user", user);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
