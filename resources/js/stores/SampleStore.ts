import { observable, action, computed } from "mobx";
import { OverviewType, MatchType, TOfferCard, TRequestCard } from "../typings/overviews";
import { getExchangeAttempts } from "../queries/getExchangeAttempts";
import { TFormField } from "../typings/Form";
import { getMatchingPercentage } from "../utils/matches/utils";
import {
	fillFieldsWithKeyValuePairs,
	createQueryStringFromFilters,
	mapOfferMatchesToOverviewData,
	mapRequestMatchesToOverviewData
} from "../utils/formatting/matches";
import { PAGINATION_LIMIT } from "../data/configs/overviews";
import { SubmitOfferForm } from "../data/forms/ExchangeAttemptOffer";
import { fieldMeetsDependencies } from "../utils/filters/fields";
import { FilterRequestsForm } from "../data/forms/ExchangeAttemptRequest";
import { matchMeetsHardFilters } from "../utils/filters/matches";
import { offerColumns } from "../data/tables/offers";
import { offerMatchColumns, requestMatchColumns } from "../data/tables/matches";
import { TExchangeAttemptType } from "../typings/exchanges";

export class SampleStore {
	@observable.shallow offers: TOfferCard[] = [];
	@observable.shallow requests: TRequestCard[] = [];
	@observable overviewType: OverviewType = OverviewType.Table;
	@observable filters: TFormField[] = [];
	@observable currentLimit = PAGINATION_LIMIT;
	@observable matchType: MatchType = MatchType.Offers;

	constructor() {
		const pref = (localStorage.getItem("overview_preference") as unknown) as OverviewType;
		if (!pref) {
			return;
		}
		this.setOverviewType(pref);
	}

	@computed get samples() {
		return this.matchType == MatchType.Offers ? this.offers : this.requests;
	}

	@computed get matches() {
		return this.samples
			.filter(sample => matchMeetsHardFilters(sample, this.filters))
			.map(sample => {
				const targetFields =
					this.matchType == MatchType.Offers
						? SubmitOfferForm.fields
						: FilterRequestsForm.fields;
				const filledSampleFields = fillFieldsWithKeyValuePairs(targetFields, sample);
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

	@computed get offerMatchOverviewData() {
		return mapOfferMatchesToOverviewData(this.matches, this.magicOfferField).slice(
			0,
			this.currentLimit
		);
	}

	@computed get requestMatchOverviewData() {
		return mapRequestMatchesToOverviewData(this.matches, this.magicRequestField).slice(
			0,
			this.currentLimit
		);
	}

	@computed get totalMatches() {
		return this.matches.length;
	}

	@computed get magicOfferField() {
		return this.filters.find(
			f =>
				f.value && !f.hidden && !f.id.match("age") && offerMatchColumns.indexOf(f.id) === -1
		);
	}

	@computed get magicRequestField() {
		return this.filters.find(
			f =>
				f.value &&
				!f.hidden &&
				!f.id.match("age") &&
				requestMatchColumns.indexOf(f.id) === -1
		);
	}

	@action.bound upgradeLimit() {
		this.currentLimit += PAGINATION_LIMIT;
	}

	@action.bound setFilters(filters, updateHistory = true) {
		this.filters = filters;
		if (updateHistory) {
			const querystring = createQueryStringFromFilters(
				filters.filter(fieldMeetsDependencies)
			);
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
		const response = await getExchangeAttempts(TExchangeAttemptType.Offer);
		if (response.success) {
			this.setOffers(response.exchange_attempts);
			this.setMatchType(MatchType.Offers);
		}
	}

	@action.bound setMatchType(matchType: MatchType) {
		this.matchType = matchType;
	}

	@action.bound selectMatch(idx) {}

	@action.bound async getSampleRequests() {
		const response = await getExchangeAttempts(TExchangeAttemptType.Request);
		if (response.success) {
			this.setRequests(response.exchange_attempts);
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
		location.href = "/app/dashboard";
	}

	@action.bound addRequest(data) {
		const { exchange_request } = data;
		this.requests = [...this.requests, exchange_request];
		location.href = "/app/dashboard";
	}

	@action.bound deleteRequest(id: number) {
		this.requests = this.requests.filter(r => r.id != id);
	}

	@action.bound deleteOffer(id: number) {
		this.offers = this.offers.filter(r => r.id != id);
	}

	@action.bound setOverviewType(overviewType: OverviewType) {
		this.overviewType = overviewType;
		localStorage.setItem("overview_preference", (overviewType as unknown) as string);
	}
}
