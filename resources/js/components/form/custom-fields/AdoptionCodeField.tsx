import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TFormFieldData } from "../../../typings/forms";
import { useFormStore } from "../../../hooks/useFormStore";
import { blockEnter } from "../../../utils/dom/keyboard";
import { Button } from "../../base/Button";

export const AdoptionCodeField: React.FC<TFormFieldData> = observer(({ id, value }) => {
	const { setFieldValue, form } = useFormStore();

	const nameSplitInParts = form.data.user.name.split(" ");
	const codePrefix = nameSplitInParts[nameSplitInParts.length - 1].substring(0, 3);

	useEffect(() => {
		generateCode();
	}, [form.data.user]);

	const generateCode = () => {
		if (form.data.adoption_info?.code) {
			setFieldValue(id, form.data.adoption_info.code);
			return;
		}
		const offerId = form.data.id;
		const currentYear = new Date().getFullYear();
		setFieldValue(id, `${codePrefix}${currentYear}-${offerId}`);
	};

	return (
		<div className="InputField">
			<div className="flex-wrapper" style={{ display: "flex", alignItems: "center" }}>
				<input
					type="text"
					value={value}
					onKeyPress={blockEnter}
					onChange={e => setFieldValue(id, e.target.value)}
					style={{ minWidth: "150px" }}
				/>
				<Button
					classes={{ no_margin: true }}
					label="copy"
					handleClick={() => {
						navigator.clipboard.writeText(value);
					}}
				/>
			</div>
		</div>
	);
});
