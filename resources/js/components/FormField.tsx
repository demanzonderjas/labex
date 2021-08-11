import React from "react";
import { TFormField } from "../typings/forms";
import { useTranslationStore } from "../hooks/useTranslationStore";
import cx from "classnames";
import { useState } from "react";
import { InfoIcon } from "./icons/InfoIcon";

type Props = {
	field: TFormField;
	error: null | string;
};

export const FormFieldWithLabel: React.FC<Props> = ({ field, error }) => {
	const { t } = useTranslationStore();
	const isCorrect = field.validate ? field.validate(field.value) && field.value : !!field.value;
	const [showDescription, setShowDescription] = useState(false);

	return (
		<div className={cx("TFormFieldWithLabel", { correct: isCorrect })}>
			<div className="label-wrapper">
				<label>
					{t(field.label)}
					{field.required && <span className="required">*</span>}
					{field.description && (
						<InfoIcon toggleShow={() => setShowDescription(!showDescription)} />
					)}
					{showDescription && (
						<div className="tooltip">
							<span className="close" onClick={() => setShowDescription(false)}>
								x
							</span>
							<p className="description">{t(field.description)}</p>
						</div>
					)}
				</label>
			</div>
			{error && <p className="error">{t(error)}</p>}

			<div className="field-wrapper">
				<field.Component
					{...field.props}
					id={field.id}
					label={field.label}
					value={field.value}
					required={field.required}
				/>
			</div>
		</div>
	);
};
