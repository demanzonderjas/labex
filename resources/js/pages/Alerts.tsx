import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/base/Button";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";
import cx from "classnames";
import { alertsColumns } from "../data/tables/alerts";
import { mapAlertsToOverviewData } from "../utils/formatting/alerts";
import { getAlerts } from "../queries/alerts";

export const AlertsPage: React.FC = () => {
	const { t } = useTranslationStore();
	const [alerts, setAlerts] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await getAlerts();
			setAlerts(response.alerts);
		})();
	}, []);

	const alertsWithCells = mapAlertsToOverviewData(alerts);

	return (
		<div className="AlertsPage">
			<PageIntro header="alerts">
				<div
					className="intro"
					dangerouslySetInnerHTML={{ __html: t("alerts_description") }}
				/>
			</PageIntro>
			<div className="layout-wrapper" style={{ margin: "20px auto" }}>
				<Link to="/app/alerts/add-new">
					<Button label="add_new_alert" />
				</Link>
				<div className="overview">
					<table className={cx({ "not-centered": true, highlightable: false })}>
						<thead>
							<tr>
								{alertsColumns.map(column => (
									<th key={column}>{t(column)}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{alertsWithCells.map((cells, idx) => (
								<tr key={alerts[idx].id}>
									{cells.map((cell, cellIdx) => (
										<cell.Component
											key={cellIdx}
											rowIndex={idx}
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
		</div>
	);
};
