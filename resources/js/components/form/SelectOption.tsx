import React from "react";
import { observer } from "mobx-react-lite";
import { TSelectOption } from "../../typings/Form";

export const SelectOption: React.FC<TSelectOption> = observer(({ label, value }) => {
	return <option value={value}>{label}</option>;
});
