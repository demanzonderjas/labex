import { observer } from "mobx-react";
import React from "react";
import { useFormStore } from "../hooks/useFormStore";
import { fieldMeetsDependencies, fieldIsNotHidden } from "../utils/filters/fields";
import { FormFieldWithLabel } from "./FormField";
import { SubmitButton } from "./base/Button";

export const Form: React.FC = observer(() => {
	const { fields, submit } = useFormStore();
	return (
		<div className="Form">
			<form onSubmit={submit}>
				{fields
					.filter(fieldIsNotHidden)
					.filter(fieldMeetsDependencies)
					.map(field => (
						<FormFieldWithLabel key={field.id} field={field} />
					))}
				<SubmitButton label="submit" />
			</form>
		</div>
	);
});
