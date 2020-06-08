import React from "react";
import { convertDateToReadableString } from "../../../utils/formatting/datetime";

type Props = {
	value: string;
};

export const DateCell: React.FC<Props> = ({ value }) => {
	const dateString = convertDateToReadableString(value);
	return <td>{dateString}</td>;
};
