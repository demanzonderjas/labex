import React from "react";
import { FormField } from "../typings/Form";
import { useTranslationStore } from "../hooks/useTranslationStore";

type Props = {
	field: FormField;
	error: null | string;
};

export const FormFieldWithLabel: React.FC<Props> = ({ field, error }) => {
	const { t } = useTranslationStore();
	return (
		<div className="FormFieldWithLabel">
			<div className="label-wrapper">
				<label>
					{t(field.label)}
					{field.required && <span className="required">*</span>}
				</label>
			</div>
			{error && <p className="error">{t(error)}</p>}
			{field.description && <p>{t(field.description)}</p>}
			<div className="field-wrapper">
				<field.Component
					{...field.props}
					id={field.id}
					label={field.label}
					value={field.value}
					// required={field.required}
				/>
			</div>
		</div>
	);
};
