import React from "react";
import { FormField } from "../../typings/Form";
import { checkIfFieldMatches } from "../../utils/matches/utils";
import { SpecStatus, TSpecMatch } from "../../typings/Sample";
import { Spec } from "./Spec";
import { PieChart } from "./PieChart";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";
import { fieldIsNotHidden, fieldMeetsDependencies } from "../../utils/filters/fields";
import { Icon } from "../base/Image";
import { SecondaryButton } from "../base/Button";

type Props = {
	fields: FormField[];
	filters: FormField[];
	matchPercentage: number;
	handleBack: Function;
};

export const Specifications: React.FC<Props> = ({
	fields,
	filters,
	matchPercentage,
	handleBack
}) => {
	const { t } = useTranslationStore();
	const matches = fields.map(field => {
		const filter = filters.find(f => f.id == field.id);
		if (!filter || !filter.value) {
			return { ...field, match: { status: SpecStatus.NotSubmitted } };
		}
		const isMatch = checkIfFieldMatches(field, filter, filters, fields);
		const match: TSpecMatch = {
			status: isMatch ? SpecStatus.Match : SpecStatus.NoMatch,
			filterValue: filter.customValue ? filter.customValue(filters) : filter.value
		};
		return { ...field, match };
	});

	return (
		<div className="Specifications">
			<div className="back-button">
				<div className="inline" onClick={() => handleBack()}>
					<Icon name="back" />
				</div>
			</div>
			<h1>{t("specifications")}</h1>
			<div className="percentage-wrapper">
				<Percentage matchPercentage={matchPercentage} />
			</div>
			<div className="body">
				<div className="specs">
					<div className="button-wrapper">
						<SecondaryButton label="select_match" />
					</div>
					{matches
						.filter(fieldIsNotHidden)
						.filter(fieldMeetsDependencies)
						.map(match => (
							<Spec key={match.id} {...match} fields={fields} />
						))}
				</div>
				<PieChart percentages={[matchPercentage, 100 - matchPercentage]} />
			</div>
		</div>
	);
};
