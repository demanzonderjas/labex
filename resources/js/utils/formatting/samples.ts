import { TSampleCard } from "../../typings/Overview";

export function createQueryStringFromSample(sample: TSampleCard) {
	return Object.keys(sample)
		.filter(key => sample[key] != null)
		.reduce((base, key) => {
			if (!base.length) {
				return `?${key}=${sample[key]}`;
			}
			return `${base}&${key}=${sample[key]}`;
		}, "");
}
