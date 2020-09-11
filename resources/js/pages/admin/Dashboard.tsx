import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { DashboardStats } from "../../components/dashboard/DashboardStats";

export const AdminDashboardPage = observer(() => {
	const { t } = useTranslationStore();
	return (
		<div className="DashboardPage">
			<h1>{t("dashboard")}</h1>
			<DashboardStats />
		</div>
	);
});
