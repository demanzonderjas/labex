import { TMatch } from "../../typings/overviews";

export function getStatusFromMatch(match: TMatch) {
	if (match.approved) {
		return "approved";
	} else if (match.awaiting_approval) {
		return "awaiting_approval";
	}
	return "declined";
}
