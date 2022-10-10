import { TAlert } from "../typings/alerts";
import { TSpecificationName } from "../typings/exchanges";
import { TSpecification } from "../typings/overviews";
import { API } from "../utils/api/axios";

export async function createAlert(specifications: { [K in TSpecificationName]: any }) {
	const specificationsArray: TSpecification[] = Object.keys(specifications).reduce(
		(base, next) => {
			if (specifications[next] != null && specifications[next] != "" && next !== "age") {
				base.push({ key: next, value: specifications[next] });
			}
			return base;
		},
		[]
	);

	try {
		const response = await API.post("alert", { specifications: specificationsArray });
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function getAlerts() {
	try {
		const response = await API.get("alerts/mine");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function getAllAlerts() {
	try {
		const response = await API.get("alerts");
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}

export async function deleteAlert(alert_id: string) {
	try {
		const response = await API.delete(`alert/${alert_id}`);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
