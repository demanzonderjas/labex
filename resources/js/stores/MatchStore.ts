import { observable, computed, action } from "mobx";
import { getMatches } from "../queries/admin/getMatches";
import { approveMatch, updateAmount } from "../queries/admin/approveMatch";
import { TMatch, TMatchStatus } from "../typings/exchanges";

export class MatchStore {
	@observable matches: TMatch[] = [];

	@computed get possibleMatches() {
		return this.matches.filter(
			match =>
				match.status === TMatchStatus.AwaitingApproval ||
				match.status === TMatchStatus.ApprovedOnce
		);
	}

	@computed get previousMatches() {
		return this.matches.filter(
			match =>
				match.status !== TMatchStatus.AwaitingApproval &&
				match.status !== TMatchStatus.ApprovedOnce
		);
	}

	@action.bound async getMatches() {
		const response = await getMatches();
		if (response.success) {
			this.setMatches(response.matches);
		}
	}

	@action.bound async updateMatchAmount(matchId: number, amount: number) {
		const response = await updateAmount(matchId, amount);
		if (response.success) {
			const matchIndex = this.matches.findIndex(m => m.id == matchId);
			const matches = [...this.matches];
			matches[matchIndex] = response.match;
			this.setMatches(matches);
		}
	}

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
