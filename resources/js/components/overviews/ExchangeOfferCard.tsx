import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";
import { Button } from "../base/Button";
import { useSampleStore } from "../../hooks/useSampleStore";
import { getMatchClasses } from "../../utils/formatting/matches";
import { AgeInPeriod } from "../match/AgeInPeriod";

type Props = {
	data?: any;
	index?: number;
};

export const ExchangeOfferCard: React.FC<Props> = ({ data, index }) => {
	const { t } = useTranslationStore();
	const { selectMatch } = useSampleStore();

	const matchPercentage = data.find(column => column.id == "match_percentage");
	const classes = getMatchClasses(matchPercentage.value);

	return (
		<div className="ExchangeOfferCard Card">
			<div className="match">
				<div className="info-block">
					<label>{t("match_percentage")}</label>
					<Percentage matchPercentage={matchPercentage.value} />
				</div>
				<Button
					classes={{ ...classes, small: true }}
					label="select"
					handleClick={() => selectMatch(index)}
				/>
			</div>
			<div className="details">
				{data
					.filter(column => column.id != "match_percentage")
					.map(column => (
						<div key={column.id} className="info-block">
							<label>{t(column.label || column.id)}</label>
							{column.id == "age" ? (
								<AgeInPeriod value={column.value} />
							) : (
								<span>{t(column.value)}</span>
							)}
						</div>
					))}
			</div>
		</div>
	);
};
