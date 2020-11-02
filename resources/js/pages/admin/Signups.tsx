import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { signupColumns } from "../../data/tables/signups";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { getSignups } from "../../queries/admin/getSignups";
import { mapSignupsToOverviewData } from "../../utils/formatting/signups";

export const SignupsPage = observer(() => {
    const { t } = useTranslationStore();
	const [signups, setSignups] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getSignups();
            setSignups(response.signups);
        })();
	}, [])   
	
	const signupsWithCells = mapSignupsToOverviewData(signups);

	return (
        <div className="AdminFAQPage">
            <h1>{t("signups")}</h1>
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
						<tr key={idx}>
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
    )
});