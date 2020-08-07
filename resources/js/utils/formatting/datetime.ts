import { DAY_IN_SECONDS } from "../../data/configs/datetime";

export const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"Octobre",
	"November",
	"December"
];

export function convertDateToReadableString(dateString: string) {
	const date = new Date(dateString);
	return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function getDatePlusTwoWeeks(dateString: string) {
	const date = new Date(dateString);
	const twoWeeks = DAY_IN_SECONDS * 14 * 1000;
	const futureDateUnix = date.getTime() + twoWeeks;
	const futureDate = new Date(futureDateUnix);
	return `${futureDate.getFullYear()}-${futureDate.getMonth() + 1}-${futureDate.getDate()}`;
}

export function prefixWithZeroBelow9(numberAsString: string) {
	return parseInt(numberAsString) < 10 && !numberAsString.match("0")
		? `0${numberAsString}`
		: numberAsString;
}
