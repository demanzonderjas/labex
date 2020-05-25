import { observable, action } from "mobx";
import { getExchangeOffers } from "../queries/getExchangeOffers";
import { TExchangeOfferCard } from "../typings/Overview";

export class SampleStore {
	@observable.shallow offers: TExchangeOfferCard[] = [];

	@action.bound async getSampleOffers() {
		const response = await getExchangeOffers();
		console.log(response);
		if (response.success) {
			this.setOffers(response.exchange_offers);
		}
	}

	@action.bound setOffers(offers) {
		this.offers = offers;
	}
}
