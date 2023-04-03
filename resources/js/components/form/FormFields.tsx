import { observer } from "mobx-react-lite";
import React from "react";
import { useFormStore } from "../../hooks/useFormStore";
import { TFormField } from "../../typings/forms";
import { fieldIsNotHidden, fieldMeetsDependencies } from "../../utils/filters/fields";
import { FormFieldWithLabel } from "../FormField";

export const FormFields: React.FC<{ activeFields: TFormField[] }> = observer(({ activeFields }) => {
	const { errors, fields } = useFormStore();

	return (
		<div className="fields">
			{activeFields
				.filter(fieldIsNotHidden)
				.filter((field, index) => fieldMeetsDependencies(field, index, fields))
				.map(field => (
					<FormFieldWithLabel key={field.id} field={field} error={errors[field.id]} />
				))}
		</div>
	);
});
