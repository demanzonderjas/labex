import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { FormFieldData, InputType } from "../../typings/Form";

interface Props extends FormFieldData {
	type: InputType;
}

export const InputField: React.FC<Props> = observer(({ id, value, type, ...props }) => {
	console.log(props);
	const { setFieldValue } = useFormStore();
	return (
		<div className="InputField">
			<input
				type={type}
				value={value}
				onChange={e => setFieldValue(id, e.target.value)}
				{...props}
			/>
		</div>
	);
});
