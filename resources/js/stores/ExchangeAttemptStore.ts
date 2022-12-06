import { observable, action, computed } from "mobx";
import { TOverviewType, TTableCell } from "../typings/overviews";
import { getExchangeAttempts, getMyLatestExchangeAttempts } from "../queries/getExchangeAttempts";
import { TFormField } from "../typings/forms";
import { getMatchingPercentage } from "../utils/matches/utils";
import {
	fillFieldsWithKeyValuePairs,
	createQueryStringFromFilters,
	convertMatchesToCells,
	fillFieldsWithSpecifications
} from "../utils/formatting/matches";
import { PAGINATION_LIMIT } from "../data/configs/overviews";
import { SubmitOfferForm } from "../data/forms/ExchangeAttemptOffer";
import { fieldMeetsDependencies } from "../utils/filters/fields";
import { FilterRequestsForm } from "../data/forms/ExchangeAttemptRequest";
import { matchMeetsHardFilters } from "../utils/filters/matches";
import {
	offerMatchCells,
	offerMatchColumns,
	requestMatchCells,
	requestMatchColumns
} from "../data/tables/matches";
import { TExchangeAttempt, TExchangeAttemptType, TSpecificationName } from "../typings/exchanges";

export class ExchangeAttemptStore {
	@observable.shallow attempts: TExchangeAttempt[] = [];
	@observable overviewType: TOverviewType = TOverviewType.Table;
	@observable filters: TFormField[] = [];
	@observable currentLimit = PAGINATION_LIMIT;
	@observable matchType: TExchangeAttemptType = TExchangeAttemptType.Offer;

	constructor() {
		const pref = (localStorage.getItem("overview_preference") as unknown) as TOverviewType;
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

	@computed get targetMatchCells() {
		return this.matchType == TExchangeAttemptType.Offer ? offerMatchCells : requestMatchCells;
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
				const filledSampleFields = fillFieldsWithSpecifications(
					this.targetFields,
					attempt.specifications
				);
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

	@computed get totalMatches() {
		return this.matches.length;
	}

	@computed get magicField() {
		const field = this.filters.find(
			f =>
				f.value &&
				!f.hidden &&
				!f.id.match("age") &&
				!f.id.match("status") &&
				!f.id.match("date_available_start") &&
				!f.id.match("adoption_code") &&
				this.magicTargetColumns.indexOf(f.id) === -1
		);
		return field || this.filters.find(f => f.id === TSpecificationName.Strain);
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
		this.filters = fillFieldsWithKeyValuePairs(this.filters, pairs).map((f: TFormField) => ({
			...f,
			ignoreInMatch: !pairs[f.id]
		}));
	}

	@action.bound async getExchangeAttempts(
		attemptType: TExchangeAttemptType,
		mineOnly: boolean,
		adminView: boolean
	) {
		const response = mineOnly
			? await getMyLatestExchangeAttempts()
			: await getExchangeAttempts(attemptType, adminView);
		if (response.success) {
			this.setAttempts(response.exchange_attempts);
			this.setMatchType(attemptType);
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

	@action.bound setOverviewType(overviewType: TOverviewType) {
		this.overviewType = overviewType;
		localStorage.setItem("overview_preference", (overviewType as unknown) as string);
	}
}
