import dayjs from "dayjs";
import { TSpecificationName } from "../../typings/exchanges";
import { TFormField } from "../../typings/forms";

export function isDateInFuture(date: string) {
	const dateObj = new Date(date);
	dateObj.setHours(23);
	dateObj.setMinutes(59);
	return dateObj.getTime() >= Date.now();
}

export function isValidDate(date: string) {
	const timestamp = Date.parse(date);
	return isNaN(timestamp) == false;
}

export function isDateInPast(date: string) {
	return !isDateInFuture(date);
}

export function isDateInRangeOfTwoWeeks(targetDate: string, startDate: string) {
	const endDate = dayjs(startDate).add(14, "day");
	const target = dayjs(targetDate);
	return target.isBefore(dayjs(startDate)) && target.isBefore(endDate);
}

export function isDateRequestedAfterStartDate(targetDate: string, startDate: string) {
	if (!startDate) {
		return true;
	}
	const target = dayjs(targetDate);
	return target.isAfter(dayjs(startDate));
}

export function isDateAvailableStartValid(dateAvailableStart: string, fields: TFormField[]) {
	console.log(isDateInFuture(dateAvailableStart));
	if (!isDateInFuture(dateAvailableStart)) {
		return false;
	}
	const endDate = fields.find(f => f.id === TSpecificationName.DateAvailableEnd);

	const startTarget = dayjs(dateAvailableStart);
	const endTarget = dayjs(endDate?.value);
	console.log(endTarget.isSame(startTarget));
	return endTarget.isAfter(startTarget) || endTarget.isSame(startTarget);
}

export function isDateAvailableEndValid(dateAvailableEnd: string, fields: TFormField[]) {
	if (!isDateInFuture(dateAvailableEnd)) {
		return false;
	}
	const startDate = fields.find(f => f.id === TSpecificationName.DateAvailableStart);

	const startTarget = dayjs(startDate?.value);
	const endTarget = dayjs(dateAvailableEnd).clone();
	return endTarget.isAfter(startTarget) || endTarget.isSame(startTarget);
}
