import { MATCHING_THRESHOLDS } from "../../data/configs/matches";
import { requestMatchCells, offerMatchCells } from "../../data/tables/matches";
import { TSpecStatus, TSpecMatch } from "../../typings/Sample";
import { checkIfFieldMatches } from "../matches/utils";
import { offerCells } from "../../data/tables/offers";
import { requestCells } from "../../data/tables/requests";
import { FormField } from "../../typings/Form";

export function getMatchClasses(value) {
	return {
		correct: value >= MATCHING_THRESHOLDS.HIGH,
		neutral: value < MATCHING_THRESHOLDS.HIGH && value >= MATCHING_THRESHOLDS.NEUTRAL,
		danger: value < MATCHING_THRESHOLDS.NEUTRAL
	};
}

export function mapOffersToOverviewData(matches) {
	return matches.map(match => {
		return offerCells.map(cell => {
			return { ...cell, value: match[cell.id] || cell.value };
		});
	});
}

export function mapRequestsToOverviewData(matches) {
	return matches.map(match => {
		return requestCells.map(cell => {
			return { ...cell, value: match[cell.id] || cell.value };
		});
	});
}

export function mapOfferMatchesToOverviewData(matches, magicField: FormField) {
	return matches.map(match => {
		return offerMatchCells.map(cell => {
			if (cell.id === "magic_cell" && magicField) {
				return { ...cell, value: match[magicField.id] || "" };
			} else if (cell.id === "magic_cell" && !magicField) {
				return null;
			}
			return { ...cell, value: match[cell.id] || cell.value };
		});
	});
}

export function mapRequestMatchesToOverviewData(matches, magicField: FormField) {
	return matches.map(match => {
		return requestMatchCells.map(cell => {
			if (cell.id === "magic_cell" && magicField) {
				return { ...cell, value: match[magicField.id] || "" };
			} else if (cell.id === "magic_cell" && !magicField) {
				return null;
			}
			return { ...cell, value: match[cell.id] || cell.value };
		});
	});
}

export function createQueryStringFromFilters(filters) {
	return filters.reduce((base, filter) => {
		if (!base.length) {
			return `?${filter.id}=${filter.value}`;
		}
		return `${base}&${filter.id}=${filter.value}`;
	}, "");
}

export function fillFieldsWithKeyValuePairs(fields, pairs) {
	return fields.map(field => {
		if (!pairs[field.id]) {
			return field;
		}
		return { ...field, value: pairs[field.id] };
	});
}

export function createMatchSpecs(fields, filters) {
	return fields.map(field => {
		const filter = filters.find(f => f.id == field.id);
		if (!filter || !filter.value) {
			return { ...field, match: { status: TSpecStatus.NotSubmitted } };
		}
		const matchStatus = checkIfFieldMatches(field, filter, filters, fields);
		const match: TSpecMatch = {
			status: matchStatus,
			filterValue: filter.customValue ? filter.customValue(filters) : filter.value
		};
		return { ...field, match };
	});
}
