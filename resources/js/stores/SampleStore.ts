import { observable, action } from "mobx";
import { getExchangeOffers } from "../queries/getExchangeOffers";
import { TSampleCard } from "../typings/Overview";

export class SampleStore {
	@observable.shallow samples: TSampleCard[] = [];

	@action.bound async getSampleOffers() {
		const response = await getExchangeOffers();
		console.log(response);
		if (response.success) {
			this.setSamples(response.exchange_offers);
		}
	}

	@action.bound setSamples(samples) {
		this.samples = samples;
	}
}
