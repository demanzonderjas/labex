import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TFormFieldData, TFormFieldName } from "../../../typings/forms";
import { useFormStore } from "../../../hooks/useFormStore";
import { blockEnter } from "../../../utils/dom/keyboard";
import { Button } from "../../base/Button";
import { useTranslationStore } from "../../../hooks/useTranslationStore";

export const AdoptionCodeField: React.FC<TFormFieldData> = observer(({ id, value }) => {
	const { setFieldValue, fields } = useFormStore();
	const { t } = useTranslationStore();

	console.log(value);

	const userField = fields.find(f => f.id === TFormFieldName.User) as any;
	const nameSplitInParts = userField.value.name.split(" ");
	const codePrefix = nameSplitInParts[nameSplitInParts.length - 1].substring(0, 3);

	useEffect(() => {
		generateCode();
	}, []);

	const generateCode = () => {
		const idField = fields.find(f => f.id === TFormFieldName.ID) as any;
		const currentYear = new Date().getFullYear();
		setFieldValue(id, `${codePrefix}${currentYear}-${idField.value}`);
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
