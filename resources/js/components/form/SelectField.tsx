import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { FormFieldData } from "../../typings/Form";

type TOption = {
	label: string;
	value: string;
};

interface Props extends FormFieldData {
	options: TOption[];
	startsEmpty: boolean;
}

export const SelectField: React.FC<Props> = observer(({ id, value, options, startsEmpty }) => {
	const { setFieldValue } = useFormStore();
	return (
		<div className="SelectField">
			<select value={value} onChange={e => setFieldValue(id, e.target.value)}>
				{startsEmpty && <option value="" />}
				{options.map(option => (
					<Option key={option.label} {...option} />
				))}
			</select>
		</div>
	);
});

const Option: React.FC<TOption> = observer(({ label, value }) => {
	return <option value={value}>{label}</option>;
});
