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
