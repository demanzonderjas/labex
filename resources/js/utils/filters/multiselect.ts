import { SpecStatus } from "../../typings/Sample";

export function isMultiSelectMatch(givenValue: string, targetValue: string): SpecStatus {
	const givenArray = givenValue.split(", ");
	const targetArray = targetValue.split(", ");
	return givenArray.some(item => targetArray.some(_item => _item == item))
		? SpecStatus.Match
		: SpecStatus.NoMatch;
}
