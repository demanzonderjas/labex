import React from "react";
import { convertDateToReadableString } from "../../../utils/formatting/datetime";
import { DisplayedDate } from "../../base/DisplayedDate";

type Props = {
	value: string;
};

export const DateCell: React.FC<Props> = ({ value }) => {
	//const dateString = convertDateToReadableString(value);

	return <td className="DateCell">{value ? <DisplayedDate value={value} /> : "n/a"}</td>;
};
