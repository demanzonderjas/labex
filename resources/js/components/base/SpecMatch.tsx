import React from "react";
import { TSpecMatch, TSpecStatus } from "../../typings/Sample";
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
				correct: match.status == TSpecStatus.Match,
				danger: match.status == TSpecStatus.NoMatch,
				warning: match.status == TSpecStatus.PartialMatch
			})}
		>
			{match.status != TSpecStatus.NotSubmitted && t(match.status)}
			{match.status != TSpecStatus.NotSubmitted && <span> ({t(match.filterValue)})</span>}
			{match.status != TSpecStatus.NotSubmitted && (
				<BooleanIcon isTrue={match.status == TSpecStatus.Match} />
			)}
		</span>
	);
};
