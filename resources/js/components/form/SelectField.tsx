import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { FormFieldData } from "../../typings/Form";
import { generateOtherFieldId, changeFieldId } from "../../utils/formatting/fields";
import { otherField } from "../../data/forms/fields/other";
import { FormFieldWithLabel } from "../FormField";
import { getFieldById } from "../../utils/getters/fields";
import { SelectOption } from "./SelectOption";
import { LocalImage } from "../base/Image";
import cx from "classnames";

interface Props extends FormFieldData {
	options: string[];
	allowOther: boolean;
	startsEmpty: boolean;
}

export const SelectField: React.FC<Props> = observer(
	({ id, value, options, startsEmpty, allowOther }) => {
		const { setFieldValue, addField, removeField, fields, errors } = useFormStore();
		const [showOtherField, setShowOtherField] = useState(false);
		const [isActive, setIsActive] = useState(false);
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
			<div className={cx("SelectField", { active: isActive })}>
				<div className="select-wrapper">
					<div className="active-option" onClick={() => setIsActive(!isActive)}>
						<SelectOption value={value} />
						<LocalImage path="icons/arrow-down.svg" />
					</div>
					<div className="dropdown with-black-scrollbar">
						{startsEmpty && value != "" && (
							<SelectOption
								handleClick={() => {
									setFieldValue(id, "");
									setIsActive(!isActive);
								}}
								value=""
							/>
						)}
						{options
							.filter(option => option != value)
							.map(option => (
								<SelectOption
									key={option}
									value={option}
									handleClick={() => {
										setFieldValue(id, option);
										setIsActive(!isActive);
									}}
								/>
							))}
						{allowOther && <SelectOption value="other" />}
					</div>
				</div>
				{showOtherField && _otherField && (
					<FormFieldWithLabel field={_otherField} error={errors[_otherField.id]} />
				)}
			</div>
		);
	}
);
