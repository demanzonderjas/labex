import React from "react";
import { PieChart } from "../match/PieChart";
import { useState, useEffect } from "react";
import { TDashboardStats } from "../../typings/stats";
import { getDashboardStats } from "../../queries/getDashboardStats";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { DASHBOARD_CHART_COLORS } from "../../data/configs/colors";
import { LocalImage } from "../base/Image";

export const DashboardStats: React.FC = React.memo(() => {
	const [stats, setStats] = useState<TDashboardStats>(null);
	const { t } = useTranslationStore();

	useEffect(() => {
		(async () => {
			const stats = await getDashboardStats();
			setStats(stats);
		})();
	}, []);

	if (!stats) {
		return null;
	}

	return (
		<div className="DashboardStats">
			<div className="card">
				<div className="content">
					<h3>{t("requests_vs_offers")}</h3>
					<span className="matches">
						<span className="number">{stats.matches}</span>
						<br />
						{stats.matches === 1 ? t("match") : t("matches")}
					</span>
					<PieChart
						percentages={[stats.requests, stats.offers]}
						colors={DASHBOARD_CHART_COLORS}
						labels={["requests", "offers"]}
					/>
					<p className="margin-10">
						{t("total_requests")}: {stats.requests}
					</p>
					<p>
						{t("total_offers")}: {stats.offers}
					</p>
				</div>
			</div>
			<div className="card">
				<div className="content">
					<h3>{t("match_amount")}</h3>
					<h4 className="number">{stats.total_saved}</h4>
				</div>
			</div>
			<div className="card">
				<div className="content">
					<h3>{t("total_users")}</h3>
					<LocalImage path="icons/users.png" />
					<h4 className="number">{stats.users}</h4>
				</div>
			</div>
			<div className="card">
				<div className="content">
					<h3>{t("total_offered")}</h3>
					<h4 className="number">{stats.total_offered}</h4>
				</div>
			</div>
			<div className="card">
				<div className="content">
					<h3>{t("total_requested")}</h3>
					<h4 className="number">{stats.total_requested}</h4>
				</div>
			</div>
		</div>
	);
});
