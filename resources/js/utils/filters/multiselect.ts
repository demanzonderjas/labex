export function isMultiSelectMatch(givenValue: string, targetValue: string): boolean {
	const givenArray = givenValue.split(", ");
	const targetArray = targetValue.split(", ");
	console.log(givenArray, targetArray);
	return givenArray.some(item => targetArray.some(_item => _item == item));
}
