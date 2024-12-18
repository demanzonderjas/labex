import React from "react";
import { TTableCellProps } from "../../../../typings/overviews";
import { getMatchClasses } from "../../../../utils/formatting/matches";
import { ButtonCell } from "../ButtonCell";
import { observer } from "mobx-react-lite";
import { useUserStore } from "../../../../hooks/useUserStore";

export const MatchButtonCell: React.FC<TTableCellProps> = observer(
	({ value, rowIndex, attempt, ...props }) => {
		const classes = getMatchClasses(attempt.match_percentage);

		return <ButtonCell {...props} label="select" classes={classes} />;
	}
);
