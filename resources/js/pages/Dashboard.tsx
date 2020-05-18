import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../hooks/useTranslationStore";

export const DashboardPage = observer(() => {
	const { t } = useTranslationStore();
	return (
		<div className="DashboardPage">
			<h1>{t("dashboard")}</h1>
		</div>
	);
});
