import axios, { AxiosInstance } from "axios";
import { env } from "../../env";
import { getMeta } from "../dom/meta";

export const API: AxiosInstance = axios.create({
	baseURL: `${env.baseUrl}/api/`,
	timeout: 5000,
	headers: {
		"X-CSRF-TOKEN": getMeta("csrf-token"),
		"X-API-USER-TOKEN": getMeta("api-user-token")
	}
});
