import { API } from "../utils/api/axios";

export async function uploadImage(image) {
	var formData = new FormData();
	formData.append("image", image);
	try {
		const response = await API.post("upload-image", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function deleteImageFromServer(path: string) {
	try {
		const response = await API.post("delete-image", { path });
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
