import { TMatch, TMatchStatus } from "../../typings/exchanges";

export function getStatusFromMatch(match: TMatch): TMatchStatus {
	return match.status;
}
