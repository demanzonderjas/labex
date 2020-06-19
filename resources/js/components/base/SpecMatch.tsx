import React from "react";
import { TSpecMatch, SpecStatus } from "../../typings/Sample";
import cx from "classnames";
import { useTranslationStore } from "../../hooks/useTranslationStore";

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
			{t(match.status)}
			{match.status == SpecStatus.NoMatch && <span> ({t(match.filterValue)})</span>}
		</span>
	);
};
