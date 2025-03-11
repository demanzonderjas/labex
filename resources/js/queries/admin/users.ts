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
		const response = await API.post("admin/add-user", user);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function loginUser(loginAttempt) {
	try {
		const response = await API.post("external-login", loginAttempt);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function demoLogin(password: string, user_id: number) {
	try {
		const response = await API.post("demo-login", { password, user_id });
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function deleteUser(userId) {
	try {
		const response = await API.delete(`user/${userId}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
