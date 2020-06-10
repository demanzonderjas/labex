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
