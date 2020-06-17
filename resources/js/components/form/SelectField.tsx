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
import { OtherOption } from "./custom-fields/OtherOption";

interface Props extends FormFieldData {
	options: string[];
	allowOther: boolean;
	startsEmpty: boolean;
}

export const SelectField: React.FC<Props> = observer(
	({ id, value, options, startsEmpty, allowOther }) => {
		const { setFieldValue } = useFormStore();
		const [showOtherField, setShowOtherField] = useState(false);
		const [isActive, setIsActive] = useState(false);

		return (
			<div className={cx("SelectField", { active: isActive })}>
				<div className="select-wrapper">
					<div
						className={cx("active-option", { "with-value": !!value })}
						onClick={() => setIsActive(!isActive)}
					>
						{!showOtherField ? (
							startsEmpty && value == "" ? (
								<SelectOption value="choose_if_relevant" />
							) : (
								<SelectOption value={value} />
							)
						) : (
							<input type="text" className="SelectOption" />
						)}
						<LocalImage path="icons/arrow-down.svg" />
					</div>
					<div className="dropdown with-black-scrollbar">
						{startsEmpty && value != "" && (
							<SelectOption
								handleClick={() => {
									setFieldValue(id, "");
									setIsActive(!isActive);
								}}
								value="choose_if_relevant"
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
						{allowOther && (
							<OtherOption
								handleActivate={() => {
									setShowOtherField(true);
									setIsActive(false);
								}}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
);
