import { TExchangeAttempt } from "../../typings/exchanges";
import { TFormField } from "../../typings/forms";
import { TSpecStatus } from "../../typings/specifications";

export function matchMeetsHardFilters(match: TExchangeAttempt, filters: TFormField[]) {
	return filters
		.filter(f => f.isHardFilter && f.value)
		.every(f => {
			const spec = match.specifications.find(s => s.key === f.id);
			return (
				f.value === match[f.id] ||
				(!f.isMatch && f.value == spec?.value) ||
				(f.isMatch && f.isMatch(f.value, spec?.value) === TSpecStatus.Match) ||
				(f.isMatch && f.isMatch(f.value, spec?.value) === TSpecStatus.PartialMatch)
			);
		});
}
