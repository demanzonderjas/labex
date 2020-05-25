import { observable, action } from "mobx";
import { getExchangeOffers } from "../queries/getExchangeOffers";
import { TExchangeOfferCard, TExchangeRequestCard } from "../typings/Overview";
import { getExchangeRequests } from "../queries/getExchangeRequests";

export class SampleStore {
	@observable.shallow offers: TExchangeOfferCard[] = [];
	@observable.shallow requests: TExchangeRequestCard[] = [];

	@action.bound async getSampleOffers() {
		const response = await getExchangeOffers();
		console.log(response);
		if (response.success) {
			this.setOffers(response.exchange_offers);
		}
	}

	@action.bound async getSampleRequests() {
		const response = await getExchangeRequests();
		console.log(response);
		if (response.success) {
			this.setRequests(response.exchange_requests);
		}
	}

	@action.bound setOffers(offers) {
		this.offers = offers;
	}

	@action.bound setRequests(requests) {
		this.requests = requests;
	}

	@action.bound addOffer(data) {
		const { exchange_offer } = data;
		this.offers = [...this.offers, exchange_offer];
	}

	@action.bound addRequest(data) {
		const { exchange_request } = data;
		this.requests = [...this.requests, exchange_request];
	}
}
