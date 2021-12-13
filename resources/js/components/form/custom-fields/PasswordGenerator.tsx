import React from "react";
import { observer } from "mobx-react-lite";
import cx from "classnames";
import { TFormFieldData } from "../../../typings/forms";
import { useFormStore } from "../../../hooks/useFormStore";
import { blockEnter } from "../../../utils/dom/keyboard";
import { Button } from "../../base/Button";
import { useTranslationStore } from "../../../hooks/useTranslationStore";

export const PasswordGeneratorField: React.FC<TFormFieldData> = observer(
	({ id, value, validate, ...props }) => {
		const { setFieldValue } = useFormStore();
		const isCorrect = validate ? validate(value) && value : !!value;
		const { t } = useTranslationStore();

		const generatePassword = () => {
			var randomstring = Math.random()
				.toString(36)
				.slice(-8);
			var randomstring2 = Math.random()
				.toString(36)
				.slice(-8);
			setFieldValue(id, randomstring + randomstring2);
		};

		return (
			<div className="InputField">
				<Button label="generate_password" handleClick={generatePassword} />
				<p>{t("copy_password_before_saving")}</p>
				<div className="flex-wrapper" style={{ display: "flex", alignItems: "center" }}>
					<input
						className={cx({ correct: isCorrect })}
						type="text"
						disabled={true}
						readOnly={true}
						value={value}
						onKeyPress={blockEnter}
						{...props}
					/>
					<Button
						label="copy"
						handleClick={() => {
							navigator.clipboard.writeText(value);
						}}
					/>
				</div>
			</div>
		);
	}
);
