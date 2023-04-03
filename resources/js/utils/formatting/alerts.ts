import { adminAlertsCells, alertsCells } from "../../data/tables/alerts";
import { TAlert } from "../../typings/alerts";

export function mapAlertsToOverviewData(alerts: TAlert[]) {
	return alerts.map(item => {
		return alertsCells.map(cell => {
			return { ...cell, value: item[cell.id] || cell.value };
		});
	});
}

export function mapAdminAlertsToOverviewData(alerts: TAlert[]) {
	return alerts.map(item => {
		return adminAlertsCells.map(cell => {
			if (cell.id === "email") {
				return { ...cell, value: item.user.email };
			}
			return { ...cell, value: item[cell.id] || cell.value };
		});
	});
}
