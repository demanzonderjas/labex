import React from "react";
import { Button } from "../../base/Button";
import { ClickHandler } from "../../../typings/Utils";

type Props = {
	value: string;
	handleClick: ClickHandler;
	classes: any;
};

export const ButtonCell: React.FC<Props> = ({ value, handleClick, classes }) => {
	return (
		<td>
			<Button label={value} classes={classes} handleClick={handleClick} />
		</td>
	);
};
