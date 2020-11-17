import { observable, action } from "mobx";
import { API } from "../utils/api/axios";

export class UserStore {
	@observable user = null;

	constructor() {
		this.fetchUser();
	}

	@action.bound async fetchUser() {
		const response = await API.get("active-user");
		this.user = response.data.user;
	}
}
