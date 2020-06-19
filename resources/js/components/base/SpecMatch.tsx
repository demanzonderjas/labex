import React from "react";
import { TSpecMatch, SpecStatus } from "../../typings/Sample";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Icon } from "./Image";
import cx from "classnames";

type Props = {
	match: TSpecMatch;
};

export const SpecMatch: React.FC<Props> = ({ match }) => {
	const { t } = useTranslationStore();
	return (
		<span
			className={cx("SpecMatch", {
				correct: match.status == SpecStatus.Match,
				danger: match.status == SpecStatus.NoMatch
			})}
		>
			{match.status != SpecStatus.NotSubmitted && t(match.status)}
			{match.status != SpecStatus.NotSubmitted && <span> ({t(match.filterValue)})</span>}
			{match.status != SpecStatus.NotSubmitted && (
				<span className="icon-wrapper">
					<Icon name={match.status == SpecStatus.Match ? "check" : "cross"} />
				</span>
			)}
		</span>
	);
};
