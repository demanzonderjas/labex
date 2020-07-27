import React from "react";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { useSampleStore } from "../../../hooks/useSampleStore";
import { TExchangeRequestCard } from "../../../typings/Overview";

type Props = {
	value: string;
	rowIndex: number;
};

export const AgeRangeCell: React.FC<Props> = ({ value, rowIndex }) => {
	const { t } = useTranslationStore();
	const { matches } = useSampleStore();

	const match = matches[rowIndex] as TExchangeRequestCard;
	return (
		<td>
			{match.age_min} - {match.age_max} {t(match.age_type)}
		</td>
	);
};
