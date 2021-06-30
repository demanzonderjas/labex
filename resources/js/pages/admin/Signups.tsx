import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { signupColumns } from "../../data/tables/signups";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { getSignups } from "../../queries/admin/getSignups";
import { mapSignupsToOverviewData } from "../../utils/formatting/signups";

export const SignupsPage = observer(() => {
	const { t } = useTranslationStore();
	const [signups, setSignups] = useState([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		(async () => {
			const response = await getSignups();

			setSignups(response.signups.reverse());
		})();
	}, []);

	const signupsWithCells = mapSignupsToOverviewData(
		signups.filter(s => s.name.match(filter) || s.email.match(filter))
	);

	return (
		<div className="AdminFAQPage">
			<h1>{t("signups")}</h1>
			<div className="filter margin-10">
				<h3 className="margin-20-0">{t("filter_search")}</h3>
				<input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
			</div>
			<table className="not-centered">
				<thead>
					<tr>
						{signupColumns.map(column => (
							<th key={column}>{t(column)}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{signupsWithCells.map((cells, idx) => (
						<tr key={signups[idx].id}>
							{cells.map((cell, cellIdx) => (
								<cell.Component
									key={cellIdx}
									rowIndex={idx}
									value={cell.value}
									signup={signups[idx]}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
});
