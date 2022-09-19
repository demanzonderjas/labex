import React from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { TFormFieldData } from "../../typings/forms";

interface Props extends TFormFieldData {}

export const BigTextField: React.FC<Props> = observer(({ id, value }) => {
	const { setFieldValue } = useFormStore();
	return (
		<div className="BigTextField">
			<textarea value={value} onChange={e => setFieldValue(id, e.target.value)} />
		</div>
	);
});
