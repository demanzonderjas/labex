import React from "react";
import { ButtonCell } from "../ButtonCell";
import { goTo } from "../../../../utils/routing/url";
import { TTableCellProps } from "../../../../typings/overviews";

export const ManageAdoptionCell: React.FC<TTableCellProps> = ({ value, attempt, ...props }) => {
	return (
		<ButtonCell
			{...props}
			handleClick={() => goTo(`/admin/offers/adoption/${attempt.id}`)}
			label="manage_adoption"
			classes={{ primary: true }}
		/>
	);
};
