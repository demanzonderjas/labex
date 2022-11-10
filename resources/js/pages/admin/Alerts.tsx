import React, { useEffect, useState } from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TAlert } from "../../typings/alerts";
import cx from "classnames";
import { adminAlertsColumns } from "../../data/tables/alerts";
import { mapAdminAlertsToOverviewData } from "../../utils/formatting/alerts";
import { getAllAlerts } from "../../queries/alerts";

export const AdminAlertsPage = () => {
	const { t } = useTranslationStore();
	const [alerts, setAlerts] = useState([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		(async () => {
			const response = await getAllAlerts();
			console.log(response);
			setAlerts(response.alerts);
		})();
	}, []);

	const filteredAlertsWithCells = mapAdminAlertsToOverviewData(
		alerts.filter(
			(a: TAlert) =>
				a.user.name.toLowerCase().match(filter.toLowerCase()) ||
				a.user.email.toLowerCase().match(filter.toLowerCase())
		)
	);

	return (
		<div className="AdminAlertsPage">
			<h1>{t("alerts")}</h1>
			<div className="filter margin-10">
				<h3 className="margin-20-0">{t("filter_search")}</h3>
				<input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
			</div>
			<div className="overview">
				<table className={cx({ "not-centered": true, highlightable: false })}>
					<thead>
						<tr>
							{adminAlertsColumns.map(column => (
								<th key={column}>{t(column)}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filteredAlertsWithCells.map((cells, idx) => (
							<tr key={alerts[idx].id}>
								{cells.map((cell, cellIdx) => (
									<cell.Component
										key={cellIdx}
										value={cell.value}
										alert={alerts[idx]}
									/>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
