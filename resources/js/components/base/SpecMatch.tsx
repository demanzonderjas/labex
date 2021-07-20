import React from "react";
import { TSpecMatch, SpecStatus } from "../../typings/Sample";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Icon } from "./Image";
import cx from "classnames";
import { BooleanIcon } from "./BooleanIcon";

type Props = {
	match: TSpecMatch;
};

export const SpecMatch: React.FC<Props> = ({ match }) => {
	const { t } = useTranslationStore();
	console.log(match);
	return (
		<span
			className={cx("SpecMatch", {
				correct: match.status == SpecStatus.Match,
				danger: match.status == SpecStatus.NoMatch,
				warning: match.status == SpecStatus.PartialMatch
			})}
		>
			{match.status != SpecStatus.NotSubmitted && t(match.status)}
			{match.status != SpecStatus.NotSubmitted && <span> ({t(match.filterValue)})</span>}
			{match.status != SpecStatus.NotSubmitted && (
				<BooleanIcon isTrue={match.status == SpecStatus.Match} />
			)}
		</span>
	);
};
