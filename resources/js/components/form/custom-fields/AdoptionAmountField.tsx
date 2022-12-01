import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TFormFieldData } from "../../../typings/forms";
import { useFormStore } from "../../../hooks/useFormStore";
import { blockEnter } from "../../../utils/dom/keyboard";

export const AdoptionAmountField: React.FC<TFormFieldData> = observer(({ id, value }) => {
	const { setFieldValue, form } = useFormStore();

	useEffect(() => {
		loadCurrentAmount();
	}, [form.data.adoption_info]);

	const loadCurrentAmount = () => {
		if (!form.data.adoption_info?.amount) {
			return;
		}
		setFieldValue(id, form.data.adoption_info.amount);
	};

	return (
		<div className="InputField">
			<div className="flex-wrapper" style={{ display: "flex", alignItems: "center" }}>
				<input
					type="number"
					value={value}
					onKeyPress={blockEnter}
					onChange={e => setFieldValue(id, e.target.value)}
					style={{ minWidth: "50px" }}
				/>
			</div>
		</div>
	);
});
