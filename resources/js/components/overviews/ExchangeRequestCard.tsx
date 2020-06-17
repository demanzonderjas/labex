import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";
import { SecondaryButton } from "../base/Button";
import { useSampleStore } from "../../hooks/useSampleStore";

type Props = {
	data?: any;
	index?: number;
};

export const ExchangeRequestCard: React.FC<Props> = ({ data, index }) => {
	const { t } = useTranslationStore();
	const { selectMatch } = useSampleStore();

	const matchPercentage = data.find(column => column.id == "match_percentage");
	return (
		<div className="ExchangeRequestCard Card">
			<div className="match">
				<div className="info-block">
					<label>{t("match_percentage")}</label>
					<Percentage matchPercentage={matchPercentage.value} />
				</div>
				<SecondaryButton label="select" handleClick={() => selectMatch(index)} />
			</div>
			<div className="details">
				{data
					.filter(column => column.id != "match_percentage")
					.map(column => (
						<div key={column.id} className="info-block">
							<label>{t(column.id)}</label>
							<span>{t(column.value)}</span>
						</div>
					))}
			</div>
		</div>
	);
};
