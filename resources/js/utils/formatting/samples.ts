import { TExchangeAttempt } from "../../typings/exchanges";

export function createQueryStringFromSample(attempt: TExchangeAttempt) {
	return attempt.specifications.reduce((base, spec) => {
		if (!base.length) {
			return `?${spec.key}=${spec.value}`;
		}
		return `${base}&${spec.key}=${spec.value}`;
	}, "");
}
