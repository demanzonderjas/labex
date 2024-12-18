import { observable, action, computed } from "mobx";
import { API } from "../utils/api/axios";

export class UserStore {
	@observable user = null;

	constructor() {
		this.fetchUser();
	}

	@computed get userCanAddContent() {
		return (
			this.user && this.user.roles.some((r) => r.name === "content" || r.name === "moderator")
		);
	}

	@action.bound async fetchUser() {
		const response = await API.get("active-user");
		this.user = response.data.user;
		console.log(this.user);
	}
}
