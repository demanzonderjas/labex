import React from "react";
import { TExchangeOfferCard } from "../../typings/Overview";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";

type Props = {
	data: any;
};

export const ExchangeOfferCard: React.FC<Props> = ({ data }) => {
	const { t } = useTranslationStore();
	const matchPercentage = data.find(column => column.id == "match_percentage");
	return (
		<div className="ExchangeOfferCard Card">
			<div className="match">
				<label>{t("match_percentage")}</label>
				<Percentage matchPercentage={matchPercentage.value} />
			</div>
			<div className="details">
				{data
					.filter(column => column.id != "match_percentage")
					.map(column => (
						<div key={column.id} className="info-block">
							<label>{t(column.id)}</label>
							<label>{t(column.value)}</label>
						</div>
					))}
			</div>
		</div>
	);
};
