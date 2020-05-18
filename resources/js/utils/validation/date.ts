export function isDateInFuture(date: string) {
	const dateObj = new Date(date);
	const now = Date.now();
	return dateObj.getTime() > now;
}
