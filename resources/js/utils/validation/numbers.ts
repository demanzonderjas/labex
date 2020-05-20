export function isBiggerThanZero(number: string) {
	if (number == "") {
		return true;
	}
	return parseInt(number) > 0;
}
