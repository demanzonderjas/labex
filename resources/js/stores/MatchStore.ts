import { observable, computed, action } from "mobx";
import { getMatches } from "../queries/admin/getMatches";
import { approveMatch, rejectMatch } from "../queries/admin/approveMatch";
import { TMatch, TMatchStatus } from "../typings/exchanges";

export class MatchStore {
	@observable matches: TMatch[] = [];

	@computed get possibleMatches() {
		return this.matches.filter(match => match.status === TMatchStatus.AwaitingApproval);
	}

	@action.bound async getMatches() {
		const response = await getMatches();
		if (response.success) {
			this.setMatches(response.matches);
		}
	}

	@action.bound async approveMatch(matchId) {
		const response = await approveMatch(matchId);
		if (response.success) {
			this.updateMatchById(matchId, TMatchStatus.Approved);
		}
	}

	// @action.bound async rejectMatch(matchId) {
	// 	const response = await rejectMatch(matchId);
	// 	if (response.success) {
	// 		this.updateMatchById(matchId, TMatchStatus.Rejected);
	// 	}
	// }

	@action.bound updateMatchById(matchId: number, status: TMatchStatus) {
		const matchIndex = this.matches.findIndex(m => m.id == matchId);
		const matches = [...this.matches];
		matches[matchIndex] = { ...matches[matchIndex], status };
		this.setMatches(matches);
	}

	@action.bound setMatches(matches) {
		this.matches = matches;
	}
}
