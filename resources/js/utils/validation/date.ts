import dayjs from "dayjs";

export function isDateInFuture(date: string) {
	const dateObj = new Date(date);
	const now = Date.now();
	return dateObj.getTime() > now;
}

export function isDateInRangeOfTwoWeeks(targetDate: string, startDate: string) {
	const endDate = dayjs(startDate).add(14, "day");
	const target = dayjs(targetDate);
	return target.isAfter(dayjs(startDate)) && target.isBefore(endDate);
}

export function isDateRequestedAfterStartDate(targetDate: string, startDate: string) {
	if (!startDate) {
		return true;
	}
	const target = dayjs(targetDate);
	return target.isAfter(dayjs(startDate));
}
