import { observable, action, computed } from "mobx";
import { getExchangeOffers } from "../queries/getExchangeOffers";
import { TExchangeOfferCard, TExchangeRequestCard, OverviewType } from "../typings/Overview";
import { getExchangeRequests } from "../queries/getExchangeRequests";
import { FormField } from "../typings/Form";
import { getMatchingPercentage } from "../utils/matches/utils";
import { mapMatchesToOverviewData } from "../utils/formatting/matches";
import { PAGINATION_LIMIT } from "../data/configs/overviews";

export class SampleStore {
	@observable.shallow offers: TExchangeOfferCard[] = [];
	@observable.shallow requests: TExchangeRequestCard[] = [];
	@observable overviewType: OverviewType = OverviewType.Table;
	@observable filters: FormField[] = [];
	@observable currentLimit = PAGINATION_LIMIT;

	@computed get matches() {
		return this.offers
			.map(offer => {
				return { ...offer, match_percentage: getMatchingPercentage(offer, this.filters) };
			})
			.filter(offer => offer.match_percentage > 0)
			.sort((a, b) => b.match_percentage - a.match_percentage);
	}

	@computed get matchOverviewData() {
		return mapMatchesToOverviewData(this.matches).slice(0, this.currentLimit);
	}

	@computed get totalMatches() {
		return this.matches.length;
	}

	@action.bound upgradeLimit() {
		this.currentLimit += PAGINATION_LIMIT;
	}

	@action.bound setFilters(filters) {
		this.filters = filters;
	}

	@action.bound async getSampleOffers() {
		const response = await getExchangeOffers();
		if (response.success) {
			this.setOffers(response.exchange_offers);
		}
	}

	@action.bound selectMatch(idx) {}

	@action.bound async getSampleRequests() {
		const response = await getExchangeRequests();
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

	@action.bound setOverviewType(overviewType: OverviewType) {
		this.overviewType = overviewType;
	}
}
