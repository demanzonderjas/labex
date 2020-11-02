import { signupCells } from "../../data/tables/signups";

export function mapSignupsToOverviewData(signups) {
	return signups.map(item => {
		return signupCells.map(cell => {
			return { ...cell, value: item[cell.id] || cell.value };
		});
	});
}