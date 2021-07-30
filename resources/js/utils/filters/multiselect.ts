import { TSpecStatus } from "../../typings/Sample";

export function isMultiSelectMatch(givenValue: string, targetValue: string): TSpecStatus {
	const givenArray = givenValue.split(", ");
	const targetArray = targetValue.split(", ");
	const fullMatch = givenArray.every(item => targetArray.some(_item => _item == item));
	const partialMatch = givenArray.some(item => targetArray.some(_item => _item == item));
	return fullMatch
		? TSpecStatus.Match
		: partialMatch
		? TSpecStatus.PartialMatch
		: TSpecStatus.NoMatch;
}
