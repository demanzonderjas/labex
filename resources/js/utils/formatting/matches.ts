import { MATCHING_THRESHOLDS } from "../../data/configs/matches";
import { TSpecStatus, TSpecMatch } from "../../typings/specifications";
import { checkIfFieldMatches, getMatchingPercentage } from "../matches/utils";
import { TFormField, TFormFieldName } from "../../typings/forms";
import { TSpecification, TTableCell, TTableCellName } from "../../typings/overviews";
import { TExchangeAttempt, TExportableOffer, TSpecificationName } from "../../typings/exchanges";
import { matchMeetsHardFilters } from "../filters/matches";
import dayjs from "dayjs";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { toJS } from "mobx";

export function getMatchClasses(value) {
	return {
		correct: value >= MATCHING_THRESHOLDS.HIGH,
		neutral: value < MATCHING_THRESHOLDS.HIGH && value >= MATCHING_THRESHOLDS.NEUTRAL,
		danger: value < MATCHING_THRESHOLDS.NEUTRAL,
	};
}

export function convertAttemptsToCells(attempts: TExchangeAttempt[], cells: TTableCell[]) {
	return attempts.map((match) => {
		return cells.map((cell) => {
			const spec = match.specifications.find((s) => s.key === cell.id);
			return { ...cell, value: spec?.value || cell.value };
		});
	});
}

export function convertMatchesToCells(
	matches: TExchangeAttempt[],
	cells: TTableCell[],
	magicField?: TFormField
): TTableCell[][] {
	return matches.map((match) => {
		return cells.map((cell) => {
			let spec = match.specifications.find((s) => s.key === cell.id);
			if (cell.id === TTableCellName.MagicCell && magicField) {
				spec = match.specifications.find((s) => s.key === magicField.id);
				return { ...cell, value: spec?.value || "", label: spec?.key };
			} else if (cell.id === TTableCellName.MagicCell && !magicField) {
				return null;
			} else if (cell.id === TTableCellName.ID) {
				return { ...cell, value: match.id };
			} else if (cell.id === TSpecificationName.MatchPercentage) {
				return { ...cell, value: match.match_percentage };
			} else if (cell.id === TTableCellName.IsMatch) {
				return { ...cell, value: !!match.is_match };
			} else if (cell.id === TFormFieldName.User) {
				return { ...cell, value: match.user };
			} else if (cell.id === TSpecificationName.Status) {
				return { ...cell, value: match.status };
			} else if (cell.id === TSpecificationName.OriginId) {
				return { ...cell, value: match.origin_id };
			}
			return { ...cell, value: spec?.value || cell.value };
		});
	});
}

export function createQueryStringFromFilters(filters: TFormField[]) {
	return filters
		.filter((f) => f.value !== "")
		.reduce((base, filter) => {
			if (!base.length) {
				return `?${filter.id}=${filter.value}`;
			}
			return `${base}&${filter.id}=${filter.value}`;
		}, "");
}

export function convertAttemptsToMatches(
	attempts: TExchangeAttempt[],
	filters: TFormField[],
	targetFields: TFormField[]
) {
	const sortedAttempts = !filters.length
		? attempts
		: attempts
				.filter((attempt) => matchMeetsHardFilters(attempt, filters))
				.map((attempt) => {
					const filledSampleFields = fillFieldsWithSpecifications(
						targetFields,
						attempt.specifications
					);
					return {
						...attempt,
						match_percentage: getMatchingPercentage(
							attempt,
							filters,
							filledSampleFields
						),
					};
				})
				.filter((attempt) => attempt.match_percentage > 0);
	sortedAttempts.sort((a, b) => b.match_percentage - a.match_percentage);
	return sortedAttempts;
}

export function fillFieldsWithKeyValuePairs(fields, pairs) {
	return fields.map((field) => {
		if (!pairs[field.id]) {
			return field;
		}
		return { ...field, value: pairs[field.id] };
	});
}

export function fillFieldsWithSpecifications(
	fields: TFormField[],
	specifications: TSpecification[]
) {
	return fields.map((field) => {
		const spec = specifications.find((s) => s.key === field.id);
		if (!spec) {
			return field;
		}
		return { ...field, value: spec.value };
	});
}

export function createMatchSpecs(fields, filters) {
	return fields.map((field) => {
		const filter = filters.find((f) => f.id == field.id);
		if (!filter || !filter.value || filter.ignoreInMatch) {
			return { ...field, match: { status: TSpecStatus.NotSubmitted } };
		}
		const matchStatus = checkIfFieldMatches(field, filter, filters, fields);
		const match: TSpecMatch = {
			status: matchStatus,
			filterValue: filter.customValue ? filter.customValue(filters) : filter.value,
		};
		return { ...field, match };
	});
}

export function formatAttemptsForExport(attempts: TExportableOffer[]) {
	const { t } = useTranslationStore();
	return attempts.map((a) => {
		const specs = a.specifications.reduce((base, spec) => {
			return { ...base, [spec.key]: t(spec.value) };
		}, {});

		return {
			id: a.id,
			origin_id: a.origin_id,
			status: a.status,
			created_at: dayjs(a.created_at).format("DD/MM/YYYY"),
			is_matched: a.is_match,
			...specs,
		};
	});
}
