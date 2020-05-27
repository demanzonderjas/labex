import { observable, computed, action } from "mobx";
import { getMatches } from "../queries/admin/getMatches";

export class MatchStore {
	@observable matches = [];

	@computed get possibleMatches() {
		return this.matches.filter(match => match.awaiting_approval);
	}

	@action.bound async getMatches() {
		const response = await getMatches();
		console.log(response);
		if (response.success) {
			this.setMatches(response.matches);
		}
	}

	@action.bound setMatches(matches) {
		this.matches = matches;
	}
}
