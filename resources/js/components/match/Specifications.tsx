import React from "react";
import { TFormField } from "../../typings/forms";
import { checkIfFieldMatches } from "../../utils/matches/utils";
import { TSpecStatus, TSpecMatch } from "../../typings/specifications";
import { Spec } from "./Spec";
import { PieChart } from "./PieChart";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";
import { fieldIsNotHidden, fieldMeetsDependencies } from "../../utils/filters/fields";
import { MATCH_CHART_COLORS } from "../../data/configs/colors";

type Props = {
	fields: TFormField[];
	filters: TFormField[];
	matchPercentage: number;
};

export const Specifications: React.FC<Props> = ({ fields, filters, matchPercentage }) => {
	const { t } = useTranslationStore();
	const matches = fields.map(field => {
		const filter = filters.find(f => f.id == field.id || f.id == field.matchVia);
		if (!filter || !filter.value || filter.ignoreInMatch) {
			return { ...field, match: { status: TSpecStatus.NotSubmitted } };
		}
		const matchStatus = checkIfFieldMatches(field, filter, filters, fields);
		const match: TSpecMatch = {
			status: matchStatus,
			filterValue: filter.customValue ? filter.customValue(filters) : filter.value
		};
		return { ...field, match };
	});

	return (
		<div className="Specifications">
			<h1>{t("specifications")}</h1>
			<div className="percentage-wrapper">
				<Percentage matchPercentage={matchPercentage} />
			</div>
			<div className="body">
				<div className="specs">
					{matches
						.filter(fieldIsNotHidden)
						.filter(fieldMeetsDependencies)
						.map(match => (
							<Spec key={match.id} {...match} fields={fields} />
						))}
				</div>
				<PieChart percentages={[matchPercentage, 100 - matchPercentage]} colors={MATCH_CHART_COLORS} />
			</div>
		</div>
	);
};
