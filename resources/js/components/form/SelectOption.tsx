import React from "react";
import { observer } from "mobx-react-lite";

type Props = { value: string };

export const SelectOption: React.FC<Props> = observer(({ value }) => {
	return <option value={value}>{value}</option>;
});
