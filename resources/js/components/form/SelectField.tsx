import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { FormFieldData } from "../../typings/Form";
import { generateOtherFieldId, changeFieldId } from "../../utils/formatting/fields";
import { otherField } from "../../data/forms/fields/other";
import { FormFieldWithLabel } from "../FormField";
import { getFieldById } from "../../utils/getters/fields";
import { SelectOption } from "./SelectOption";

interface Props extends FormFieldData {
	options: string[];
	allowOther: boolean;
	startsEmpty: boolean;
}

export const SelectField: React.FC<Props> = observer(
	({ id, value, options, startsEmpty, allowOther }) => {
		const { setFieldValue, addField, removeField, fields, errors } = useFormStore();
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
						<SelectOption key={option} value={option} />
					))}
					{allowOther && <SelectOption value="other" />}
				</select>
				{showOtherField && _otherField && (
					<FormFieldWithLabel field={_otherField} error={errors[_otherField.id]} />
				)}
			</div>
		);
	}
);
