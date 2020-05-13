import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { FormFieldData } from "../../typings/Form";

interface Props extends FormFieldData {}

export const BigTextField: React.FC<Props> = observer(({ id, value }) => {
	const { setFieldValue } = useFormStore();
	return (
		<div className="BigTextField">
			<textarea value={value} onChange={e => setFieldValue(id, e.target.value)} />
		</div>
	);
});
