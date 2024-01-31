import { TExchangeAttempt } from "../../typings/exchanges";
import { createQueryStringFromSpecs } from "../formatting/samples";

export function goTo(url: string) {
	location.href = url;
}

export function goToCopyLink(navigate: any, attempt: TExchangeAttempt) {
	const queryString = createQueryStringFromSpecs(attempt);
	navigate(`/app/submit-${attempt.attempt_type}${queryString}`);
}

export function goToEditLink(navigate: any, attempt: TExchangeAttempt) {
	const queryString = createQueryStringFromSpecs(attempt);
	navigate(`/app/${attempt.attempt_type}s/edit/${attempt.id}${queryString}`);
}

export function goToAdminEditLink(navigate: any, attempt: TExchangeAttempt) {
	const queryString = createQueryStringFromSpecs(attempt);
	navigate(`/admin/${attempt.attempt_type}s/edit/${attempt.id}${queryString}`);
}
