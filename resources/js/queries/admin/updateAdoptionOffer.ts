import { TExchangeAttempt } from "../../typings/exchanges";
import { API } from "../../utils/api/axios";

export async function updateAdoptionOffer(offer: TExchangeAttempt) {
	const { id } = offer;
	try {
		const response = await API.post(`offers/adoption/${id}`, offer);
		return response.data;
	} catch (e) {
		return { success: false, message: "invalid_request" };
	}
}
