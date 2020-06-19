import React from "react";
import { FormField } from "../../typings/Form";
import { checkIfFieldMatches, getMatchingPercentage } from "../../utils/matches/utils";
import { SpecStatus, TSpecMatch } from "../../typings/Sample";
import { Spec } from "./Spec";
import { PieChart } from "./PieChart";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";

type Props = {
	fields: FormField[];
	filters: FormField[];
	matchPercentage: number;
};

export const Specifications: React.FC<Props> = ({ fields, filters, matchPercentage }) => {
	const { t } = useTranslationStore();
	const matches = fields.map(field => {
		const filter = filters.find(f => f.id == field.id);
		if (!filter || !filter.value) {
			return { ...field, match: { status: SpecStatus.NotSubmitted } };
		}
		const isMatch = checkIfFieldMatches(field, filter, filters);
		const match: TSpecMatch = {
			status: isMatch ? SpecStatus.Match : SpecStatus.NoMatch,
			filterValue: filter.value
		};
		return { ...field, match };
	});

	return (
		<div className="Specifications">
			<h1>{t("specifications")}</h1>
			<div className="percentage-wrapper">
				<Percentage matchPercentage={matchPercentage} />
			</div>
			<div className="specs">
				{matches.map(match => (
					<Spec key={match.id} {...match} />
				))}
			</div>
			<PieChart />
		</div>
	);
};
