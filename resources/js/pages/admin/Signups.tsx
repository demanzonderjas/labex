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
	const [sortingKey, setSortingKey] = useState("id");
	const [reverse, setReverse] = useState(true);

	const sortByColumn = (byColumn: string) => {
		if (sortingKey === byColumn) {
			setReverse(!reverse);
		} else {
			setSortingKey(byColumn);
		}
	};

	useEffect(() => {
		(async () => {
			const response = await getSignups();

			setSignups(response.signups);
		})();
	}, []);

	const sorted = signups
		.filter(
			s =>
				s.name.toLowerCase().match(filter.toLowerCase()) ||
				s.email.toLowerCase().match(filter.toLowerCase())
		)
		.sort((a, b) => {
			if (a[sortingKey] < b[sortingKey]) {
				return reverse ? 1 : -1;
			}
			if (a[sortingKey] > b[sortingKey]) {
				return reverse ? -1 : 1;
			}
			return 0;
		});

	const signupsWithCells = mapSignupsToOverviewData(sorted);

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
							<th
								key={column}
								onClick={() => sortByColumn(column)}
								style={{ cursor: "pointer" }}
							>
								{t(column)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{signupsWithCells.map((cells, idx) => (
						<tr key={sorted[idx].id}>
							{cells.map((cell, cellIdx) => (
								<cell.Component
									key={cellIdx}
									rowIndex={idx}
									value={cell.value}
									signup={sorted[idx]}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
});
