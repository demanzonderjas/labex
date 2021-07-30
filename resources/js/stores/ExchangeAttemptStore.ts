import { observable, action, computed } from "mobx";
import { OverviewType, MatchType } from "../typings/overviews";
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
import { offerMatchColumns, requestMatchColumns } from "../data/tables/matches";
import { TExchangeAttempt, TExchangeAttemptType } from "../typings/exchanges";

export class ExchangeAttemptStore {
	@observable.shallow attempts: TExchangeAttempt[] = [];
	@observable overviewType: OverviewType = OverviewType.Table;
	@observable filters: TFormField[] = [];
	@observable currentLimit = PAGINATION_LIMIT;
	@observable matchType: TExchangeAttemptType = TExchangeAttemptType.Offer;

	constructor() {
		const pref = (localStorage.getItem("overview_preference") as unknown) as OverviewType;
		if (!pref) {
			return;
		}
		this.setOverviewType(pref);
	}

	@computed get offers() {
		if (!this.attempts) {
			return [];
		}
		return this.attempts.filter(a => a.attempt_type === TExchangeAttemptType.Offer);
	}

	@computed get requests() {
		if (!this.attempts) {
			return [];
		}
		return this.attempts.filter(a => a.attempt_type === TExchangeAttemptType.Request);
	}

	@computed get targetFields() {
		return this.matchType == TExchangeAttemptType.Offer
			? SubmitOfferForm.fields
			: FilterRequestsForm.fields;
	}

	@computed get magicTargetColumns() {
		return this.matchType == TExchangeAttemptType.Offer
			? offerMatchColumns
			: requestMatchColumns;
	}

	@computed get matches() {
		return this.attempts
			.filter(attempt => matchMeetsHardFilters(attempt, this.filters))
			.map(attempt => {
				const filledSampleFields = fillFieldsWithKeyValuePairs(this.targetFields, attempt);
				return {
					...attempt,
					match_percentage: getMatchingPercentage(
						attempt,
						this.filters,
						filledSampleFields
					)
				};
			})
			.filter(attempt => attempt.match_percentage > 0)
			.sort((a, b) => b.match_percentage - a.match_percentage);
	}

	@computed get attemptOverviewData() {
		return mapOfferMatchesToOverviewData(this.matches, this.magicField).slice(
			0,
			this.currentLimit
		);
	}

	@computed get totalMatches() {
		return this.matches.length;
	}

	@computed get magicField() {
		return this.filters.find(
			f =>
				f.value &&
				!f.hidden &&
				!f.id.match("age") &&
				this.magicTargetColumns.indexOf(f.id) === -1
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
				"Updated filters",
				window.location.pathname + querystring
			);
		}
	}

	@action.bound loadFiltersFromKeyValuePairs(pairs) {
		this.filters = fillFieldsWithKeyValuePairs(this.filters, pairs);
	}

	@action.bound async getExchangeAttempts(attempt_type: TExchangeAttemptType) {
		const response = await getExchangeAttempts(attempt_type);
		if (response.success) {
			this.setAttempts(response.exchange_attempts);
			this.setMatchType(attempt_type);
		}
	}

	@action.bound setMatchType(matchType: TExchangeAttemptType) {
		this.matchType = matchType;
	}

	@action.bound setAttempts(attempts: TExchangeAttempt[]) {
		this.attempts = attempts;
	}

	@action.bound addAttempt(data) {
		const { exchange_attempt } = data;
		this.attempts = [...this.attempts, exchange_attempt];
		location.href = "/app/dashboard";
	}

	@action.bound deleteAttempt(id: number) {
		this.attempts = this.attempts.filter(r => r.id != id);
	}

	@action.bound setOverviewType(overviewType: OverviewType) {
		this.overviewType = overviewType;
		localStorage.setItem("overview_preference", (overviewType as unknown) as string);
	}
}
