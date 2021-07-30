import { observable, computed, action } from "mobx";
import { getMatches } from "../queries/admin/getMatches";
import { TMatch } from "../typings/overviews";
import { approveMatch, rejectMatch } from "../queries/admin/approveMatch";

export class MatchStore {
	@observable matches: TMatch[] = [];

	@computed get possibleMatches() {
		return this.matches.filter(match => match.awaiting_approval);
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
			this.updateMatchById(matchId, "awaiting_approval", false);
		}
	}

	@action.bound async rejectMatch(matchId) {
		const response = await rejectMatch(matchId);
		if (response.success) {
			this.updateMatchById(matchId, "awaiting_approval", false);
		}
	}

	@action.bound updateMatchById(matchId, key, value) {
		const matchIndex = this.matches.findIndex(m => m.id == matchId);
		const matches = [...this.matches];
		matches[matchIndex] = { ...matches[matchIndex], [key]: value };
		this.setMatches(matches);
	}

	@action.bound setMatches(matches) {
		this.matches = matches;
	}
}
