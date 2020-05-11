import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { FormFieldData, FormField } from "../../typings/Form";
import { generateOtherFieldId, changeFieldId } from "../../utils/formatting/fields";
import { otherField } from "../../data/forms/fields/other";
import { FormFieldWithLabel } from "../FormField";
import { getFieldById } from "../../utils/getters/fields";

type TOption = {
	label: string;
	value: string;
};

interface Props extends FormFieldData {
	options: TOption[];
	allowOther: boolean;
	startsEmpty: boolean;
}

export const SelectField: React.FC<Props> = observer(
	({ id, value, options, startsEmpty, allowOther }) => {
		const { setFieldValue, addField, removeField, fields } = useFormStore();
		const [showOtherField, setShowOtherField] = useState(false);
		const otherFieldId = generateOtherFieldId(id);
		const _otherField = getFieldById(otherFieldId, fields);

		useEffect(() => {
			if (value == "other") {
				const field = changeFieldId(otherField, otherFieldId);
				addField(field);
				setShowOtherField(true);
			} else {
				removeField(otherFieldId);
				setShowOtherField(false);
			}
		}, [value]);

		return (
			<div className="SelectField">
				<select value={value} onChange={e => setFieldValue(id, e.target.value)}>
					{startsEmpty && <option value="" />}
					{options.map(option => (
						<Option key={option.label} {...option} />
					))}
					{allowOther && <Option label="other" value="other" />}
				</select>
				{showOtherField && _otherField && <FormFieldWithLabel field={_otherField} />}
			</div>
		);
	}
);

const Option: React.FC<TOption> = observer(({ label, value }) => {
	return <option value={value}>{label}</option>;
});
