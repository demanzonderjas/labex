import React, { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import { FormFieldData } from "../../typings/Form";
import { SelectOption } from "./SelectOption";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { LocalImage } from "../base/Image";
import cx from "classnames";
import { blockEnter } from "../../utils/dom/keyboard";
import { OtherOption } from "./custom-fields/OtherOption";

interface Props extends FormFieldData {
	options: string[];
	startsEmpty?: boolean;
	allowOther?: boolean;
	required?: boolean;
}

export const MultiSelectField: React.FC<Props> = observer(
	({ id, value, options, startsEmpty, allowOther, required }) => {
		const { setFieldValue } = useFormStore();
		const [showOtherField, setShowOtherField] = useState(false);
		const [isActive, setIsActive] = useState(false);
		const inputOtherRef = useRef(null);
		const { t } = useTranslationStore();

		const addSelection = (newValue: string) => {
			const selectionExistsAlready = value.match(newValue);
			if (selectionExistsAlready) {
				removeSelection(newValue);
				return;
			}
			const totalSelection = `${value},${newValue}`;
			setFieldValue(id, totalSelection);
		};

		const removeSelection = selection => {
			const filteredSelection = selectionArray.filter(s => s != selection).join(",");
			setFieldValue(id, filteredSelection);
		};

		const selectionArray = value.split(",");

		return (
			<>
				<div className={cx("SelectField MultiSelectField", { active: isActive })}>
					<div className="select-wrapper">
						<div
							className={cx("active-option", { "with-value": !!value })}
							onClick={() => {
								setIsActive(!isActive);
								setShowOtherField(false);
							}}
						>
							{!showOtherField ? (
								startsEmpty && (
									<SelectOption
										value={required ? "select_option" : "choose_if_relevant"}
									/>
								)
							) : (
								<div
									className={cx("SelectOption other", { active: showOtherField })}
								>
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
							{startsEmpty && value != "" && !isActive && (
								<SelectOption
									handleClick={() => {
										setFieldValue(id, "");
										// setIsActive(!isActive);
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
										isSelected={!!value.match(option)}
										handleClick={() => {
											addSelection(option);
											// setIsActive(!isActive);
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
				<div className="selections">
					{selectionArray
						.filter(selection => !!selection)
						.map(selection => (
							<div
								key={selection}
								onClick={() => removeSelection(selection)}
								className="selection"
							>
								{t(selection)}
							</div>
						))}
				</div>
			</>
		);
	}
);
