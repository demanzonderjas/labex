import { userCells } from "../../data/tables/users";
import { TUser } from "../../typings/user";

export function mapUsersToOverviewData(users: TUser[]) {
	return users.map(item => {
		return userCells.map(cell => {
			return { ...cell, value: item[cell.id] || cell.value };
		});
	});
}
