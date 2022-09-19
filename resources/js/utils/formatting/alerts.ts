import { alertsCells } from "../../data/tables/alerts";
import { signupCells } from "../../data/tables/signups";
import { TAlert } from "../../typings/alerts";

export function mapAlertsToOverviewData(alerts: TAlert[]) {
	return alerts.map(item => {
		return alertsCells.map(cell => {
			return { ...cell, value: item[cell.id] || cell.value };
		});
	});
}
