import React from "react";
import { FormField } from "../typings/Form";
import { useTranslationStore } from "../hooks/useTranslationStore";
import cx from "classnames";

type Props = {
	field: FormField;
	error: null | string;
};

export const FormFieldWithLabel: React.FC<Props> = ({ field, error }) => {
	const { t } = useTranslationStore();
	const isCorrect = field.validate ? field.validate(field.value) && field.value : !!field.value;

	return (
		<div className={cx("FormFieldWithLabel", { correct: isCorrect })}>
			<div className="label-wrapper">
				<label>
					{t(field.label)}
					{field.required && <span className="required">*</span>}
				</label>
			</div>
			{error && <p className="error">{t(error)}</p>}
			{field.description && <p className="description">{t(field.description)}</p>}
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
