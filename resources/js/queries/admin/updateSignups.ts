import { API } from "../../utils/api/axios";

export async function approveSignup(signup) {
    const { id } = signup;
	try {
		const response = await API.post(`signups/approve/${id}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function declineSignup(signup) {
    const { id } = signup;
	try {
		const response = await API.post(`signups/decline/${id}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function deleteSignup(signup) {
    const { id } = signup;
	try {
		const response = await API.post(`signups/delete/${id}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
