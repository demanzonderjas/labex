import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { FormFieldData, SelectFieldData } from "../../typings/Form";
import { SelectOption } from "./SelectOption";
import { LocalImage } from "../base/Image";
import cx from "classnames";
import { OtherOption } from "./custom-fields/OtherOption";
import { blockEnter } from "../../utils/dom/keyboard";

export const SelectField: React.FC<SelectFieldData> = observer(
	({ id, value, options, startsEmpty, allowOther }) => {
		const { setFieldValue } = useFormStore();
		const [showOtherField, setShowOtherField] = useState(false);
		const [isActive, setIsActive] = useState(false);
		const inputOtherRef = useRef(null);

		useEffect(() => {
			if (showOtherField) {
				inputOtherRef.current.focus();
				setFieldValue(id, "");
			}
		}, [showOtherField, isActive]);

		return (
			<div className={cx("SelectField", { active: isActive })}>
				<div className="select-wrapper">
					<div
						className={cx("active-option", { "with-value": !!value })}
						onClick={() => {
							setIsActive(!isActive);
							setShowOtherField(false);
						}}
					>
						{!showOtherField ? (
							startsEmpty && value == "" ? (
								<SelectOption value="choose_if_relevant" />
							) : (
								<SelectOption value={value} />
							)
						) : (
							<div className={cx("SelectOption other", { active: showOtherField })}>
								<input
									value={value}
									onBlur={() => setShowOtherField(false)}
									type="text"
									onKeyPress={blockEnter}
									className="SelectOption"
									ref={inputOtherRef}
									onChange={e => setFieldValue(id, e.target.value)}
								/>
							</div>
						)}
						{showOtherField ? (
							<LocalImage path="icons/minus.svg" />
						) : (
							<LocalImage path="icons/arrow-down.svg" />
						)}
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
