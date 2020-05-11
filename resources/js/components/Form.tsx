import { observer } from "mobx-react";
import React from "react";
import { useFormStore } from "../hooks/useFormStore";
import { toJS } from "mobx";
import { fieldMeetsDependencies, fieldIsNotHidden } from "../utils/filters/fields";
import { FormFieldWithLabel } from "./FormField";

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
				<button type="submit">Submit</button>
			</form>
		</div>
	);
});
