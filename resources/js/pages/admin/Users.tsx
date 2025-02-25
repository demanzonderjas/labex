import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/base/Button";
import { userColumns } from "../../data/tables/users";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { getUsers } from "../../queries/admin/users";
import { TUser } from "../../typings/user";
import { mapUsersToOverviewData } from "../../utils/formatting/users";

export const UsersPage = observer(() => {
	const { t } = useTranslationStore();
	const [users, setUsers] = useState<TUser[]>([]);
	const [filter, setFilter] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const response = await getUsers();
			setUsers(response.users.reverse());
		})();
	}, []);

	const usersWithCells = mapUsersToOverviewData(
		users.filter(
			(s) => !filter || (s.name && s.name.match(filter)) || (s.email && s.email.match(filter))
		)
	);

	return (
		<div className="UsersPage">
			<h1>{t("users")}</h1>
			<div className="filter margin-10">
				<h3 className="margin-20-0">{t("filter_search")}</h3>
				<input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
			</div>
			<Button label="add_user" handleClick={() => navigate("/admin/users/add-user")} />
			<table className="not-centered">
				<thead>
					<tr>
						{userColumns.map((column) => (
							<th key={column}>{t(column)}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{usersWithCells.map((cells, idx) => (
						<tr key={users[idx].id}>
							{cells.map((cell, cellIdx) => (
								<cell.Component
									key={cellIdx}
									value={cell.value}
									rowIndex={idx}
									userId={cells.find((c) => c.id === "id")?.value}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
});
