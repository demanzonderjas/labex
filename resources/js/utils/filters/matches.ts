import { FormField } from "../../typings/Form";
import { TSampleCard } from "../../typings/Overview";
import { SpecStatus } from "../../typings/Sample";

export function matchMeetsHardFilters(match: TSampleCard, filters: FormField[]) {
	return filters
		.filter(f => f.isHardFilter && f.value)
		.every(
			f =>
				(!f.isMatch && f.value == match[f.id]) ||
				(f.isMatch && f.isMatch(f.value, match[f.id]) === SpecStatus.Match)
		);
}
