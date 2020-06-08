import { MATCHING_THRESHOLDS } from "../../data/configs/matches";

export function getMatchClasses(value) {
	return {
		correct: value >= MATCHING_THRESHOLDS.HIGH,
		neutral: value < MATCHING_THRESHOLDS.HIGH && value >= MATCHING_THRESHOLDS.NEUTRAL,
		danger: value < MATCHING_THRESHOLDS.NEUTRAL
	};
}
