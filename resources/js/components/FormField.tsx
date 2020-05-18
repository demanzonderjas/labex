import React from "react";
import { FormField } from "../typings/Form";
import { useTranslationStore } from "../hooks/useTranslationStore";

type Props = {
	field: FormField;
};

export const FormFieldWithLabel: React.FC<Props> = ({ field }) => {
	const { t } = useTranslationStore();
	return (
		<div className="FormFieldWithLabel">
			<div className="label-wrapper">
				<label>
					{t(field.label)}
					{field.required && <span className="required">*</span>}
				</label>
			</div>
			{field.description && <p>{t(field.description)}</p>}
			<div className="field-wrapper">
				<field.Component
					{...field.props}
					id={field.id}
					label={field.label}
					value={field.value}
				/>
			</div>
		</div>
	);
};
