import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";

type TOption = {
	label: string;
	value: string;
};

type Props = {
	label: string;
	id: string;
	options: TOption[];
	value: string;
	startsEmpty: boolean;
};

export const SelectField: React.FC<Props> = observer(
	({ label, id, value, options, startsEmpty }) => {
		const { setFieldValue } = useFormStore();
		return (
			<div className="SelectField">
				<label>{label}</label>
				<select value={value} onChange={e => setFieldValue(id, e.target.value)}>
					{startsEmpty && <option value="" />}
					{options.map(option => (
						<Option key={option.label} {...option} />
					))}
				</select>
			</div>
		);
	}
);

const Option: React.FC<TOption> = observer(({ label, value }) => {
	return <option value={value}>{label}</option>;
});
