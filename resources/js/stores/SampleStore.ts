import { observable, action, computed } from "mobx";
import { getExchangeOffers } from "../queries/getExchangeOffers";
import {
	TExchangeOfferCard,
	TExchangeRequestCard,
	OverviewType,
	MatchType,
	TSampleCard
} from "../typings/Overview";
import { getExchangeRequests } from "../queries/getExchangeRequests";
import { FormField } from "../typings/Form";
import { getMatchingPercentage } from "../utils/matches/utils";
import {
	mapMatchesToOverviewData,
	fillFieldsWithKeyValuePairs,
	createQueryStringFromFilters
} from "../utils/formatting/matches";
import { PAGINATION_LIMIT } from "../data/configs/overviews";
import { ExchangeOffer } from "../data/forms/ExchangeOffer";

export class SampleStore {
	@observable.shallow offers: TSampleCard[] = [];
	@observable.shallow requests: TSampleCard[] = [];
	@observable overviewType: OverviewType = OverviewType.Table;
	@observable filters: FormField[] = [];
	@observable currentLimit = PAGINATION_LIMIT;
	@observable matchType: MatchType = MatchType.Offers;

	@computed get samples() {
		return this.matchType == MatchType.Offers ? this.offers : this.requests;
	}

	@computed get matches() {
		return this.samples
			.map(sample => {
				const filledSampleFields = fillFieldsWithKeyValuePairs(
					ExchangeOffer.fields,
					sample
				);
				return {
					...sample,
					match_percentage: getMatchingPercentage(
						sample,
						this.filters,
						filledSampleFields
					)
				};
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

	@action.bound setFilters(filters, updateHistory = true) {
		this.filters = filters;
		if (updateHistory) {
			const querystring = createQueryStringFromFilters(filters);
			window.history.pushState(
				"filter",
				"Filter Test",
				window.location.pathname + querystring
			);
		}
	}

	@action.bound loadFiltersFromKeyValuePairs(pairs) {
		this.filters = fillFieldsWithKeyValuePairs(this.filters, pairs);
	}

	@action.bound async getSampleOffers() {
		const response = await getExchangeOffers();
		if (response.success) {
			this.setOffers(response.exchange_offers);
			this.setMatchType(MatchType.Offers);
		}
	}

	@action.bound setMatchType(matchType: MatchType) {
		this.matchType = matchType;
	}

	@action.bound selectMatch(idx) {}

	@action.bound async getSampleRequests() {
		const response = await getExchangeRequests();
		if (response.success) {
			this.setRequests(response.exchange_requests);
			this.setMatchType(MatchType.Requests);
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
