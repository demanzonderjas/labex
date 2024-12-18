import React from "react";
import { TFormField } from "../../typings/forms";
import { checkIfFieldMatches } from "../../utils/matches/utils";
import { TSpecStatus, TSpecMatch } from "../../typings/specifications";
import { Spec } from "./Spec";
import { PieChart } from "./PieChart";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Percentage } from "../base/Percentage";
import { fieldIsNotHidden, fieldMeetsDependencies } from "../../utils/filters/fields";
import { Icon } from "../base/Image";
import { SecondaryButton } from "../base/Button";
import { MATCH_CHART_COLORS } from "../../data/configs/colors";
import { observer } from "mobx-react-lite";
import { useUserStore } from "../../hooks/useUserStore";

type Props = {
	fields: TFormField[];
	filters: TFormField[];
	matchPercentage: number;
	handleBack: Function;
	handleSelect: Function;
	isMatch?: boolean;
};

export const Specifications: React.FC<Props> = observer(
	({ fields, filters, matchPercentage, handleBack, handleSelect, isMatch: isAlreadyMatched }) => {
		const { t } = useTranslationStore();
		const { userCanAddContent } = useUserStore();

		const matches = fields.map((field) => {
			const filter = filters.find((f) => f.id == field.id || f.id == field.matchVia);
			if (!filter || !filter.value || filter.ignoreInMatch) {
				return { ...field, match: { status: TSpecStatus.NotSubmitted } };
			}
			const matchStatus = checkIfFieldMatches(field, filter, filters, fields);
			const match: TSpecMatch = {
				status: matchStatus,
				filterValue: filter.customValue ? filter.customValue(filters) : filter.value,
			};
			return { ...field, match };
		});

		return (
			<div className="Specifications">
				{!isAlreadyMatched && (
					<div className="back-button">
						<div className="inline" onClick={() => handleBack()}>
							<Icon name="back" />
						</div>
					</div>
				)}
				<h1>{t("specifications")}</h1>
				<div className="percentage-wrapper">
					<Percentage matchPercentage={matchPercentage} />
				</div>
				<div className="body">
					<div className="specs">
						{!isAlreadyMatched && userCanAddContent && (
							<div className="button-wrapper">
								<SecondaryButton
									label="select_match"
									handleClick={() => handleSelect()}
								/>
							</div>
						)}
						{matches
							.filter(fieldIsNotHidden)
							.filter(fieldMeetsDependencies)
							.map((match) => (
								<Spec key={match.id} {...match} fields={fields} />
							))}
					</div>
					<PieChart
						percentages={[matchPercentage, 100 - matchPercentage]}
						colors={MATCH_CHART_COLORS}
					/>
				</div>
			</div>
		);
	}
);
