import { MATCHING_THRESHOLDS } from "../../data/configs/matches";
import { matchCells } from "../../data/tables/matches";

export function getMatchClasses(value) {
	return {
		correct: value >= MATCHING_THRESHOLDS.HIGH,
		neutral: value < MATCHING_THRESHOLDS.HIGH && value >= MATCHING_THRESHOLDS.NEUTRAL,
		danger: value < MATCHING_THRESHOLDS.NEUTRAL
	};
}

export function mapMatchesToOverviewData(matches) {
	return matches.map(match => {
		return matchCells.map(cell => {
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
