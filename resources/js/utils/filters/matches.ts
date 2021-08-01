import { TExchangeAttempt } from "../../typings/exchanges";
import { TFormField } from "../../typings/Form";
import { TSpecStatus } from "../../typings/Sample";

export function matchMeetsHardFilters(match: TExchangeAttempt, filters: TFormField[]) {
	return filters
		.filter(f => f.isHardFilter && f.value)
		.every(f => {
			const spec = match.specifications.find(s => s.key === f.id);
			return (
				(!f.isMatch && f.value == spec?.value) ||
				(f.isMatch && f.isMatch(f.value, spec?.value) === TSpecStatus.Match) ||
				(f.isMatch && f.isMatch(f.value, spec?.value) === TSpecStatus.PartialMatch)
			);
		});
}
