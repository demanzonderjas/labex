import { TFormField } from "../../typings/Form";
import { TSampleCard } from "../../typings/overviews";
import { TSpecStatus } from "../../typings/Sample";

export function matchMeetsHardFilters(match: TSampleCard, filters: TFormField[]) {
	return filters
		.filter(f => f.isHardFilter && f.value)
		.every(
			f =>
				(!f.isMatch && f.value == match[f.id]) ||
				(f.isMatch && f.isMatch(f.value, match[f.id]) === TSpecStatus.Match) ||
				(f.isMatch && f.isMatch(f.value, match[f.id]) === TSpecStatus.PartialMatch)
		);
}
