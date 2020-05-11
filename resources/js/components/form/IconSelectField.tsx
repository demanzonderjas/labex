import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { FormFieldData } from "../../typings/Form";
import { LocalImage } from "../base/Image";
import cx from "classnames";

type TOption = {
	icon: string;
	value: string;
	handleSelect: Function;
	isSelected: boolean;
};

interface Props extends FormFieldData {
	options: TOption[];
}

export const IconSelectField: React.FC<Props> = observer(({ id, value, options }) => {
	const { setFieldValue } = useFormStore();
	return (
		<div className="IconSelectField">
			{options.map(option => (
				<Option
					key={option.value}
					{...option}
					handleSelect={value => setFieldValue(id, value)}
					isSelected={value == option.value}
				/>
			))}
		</div>
	);
});

const Option: React.FC<TOption> = observer(({ icon, value, handleSelect, isSelected }) => {
	return (
		<div
			className={cx("Option", { selected: isSelected })}
			onClick={() => handleSelect(isSelected ? "" : value)}
		>
			<LocalImage path={`icons/${icon}.svg`} />
		</div>
	);
});
