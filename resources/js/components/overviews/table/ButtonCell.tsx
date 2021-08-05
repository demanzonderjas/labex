import React from "react";
import { Button } from "../../base/Button";
import { ClickHandler } from "../../../typings/utils";

type Props = {
	label: string;
	handleClick?: ClickHandler;
	classes?: any;
};

export const ButtonCell: React.FC<Props> = ({ label, handleClick, classes }) => {
	return (
		<td>
			<Button label={label} classes={classes} handleClick={handleClick} />
		</td>
	);
};
