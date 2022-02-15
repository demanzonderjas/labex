import { TExchangeAttempt } from "../../typings/exchanges";
import { createQueryStringFromSpecs } from "../formatting/samples";

export function goTo(url: string) {
	location.href = url;
}

export function goToCopyLink(history: any, attempt: TExchangeAttempt) {
	const queryString = createQueryStringFromSpecs(attempt);
	history.push(`/app/submit-${attempt.attempt_type}${queryString}`);
}

export function goToEditLink(history: any, attempt: TExchangeAttempt) {
	const queryString = createQueryStringFromSpecs(attempt);
	history.push(`/app/${attempt.attempt_type}s/edit/${attempt.id}${queryString}`);
}
