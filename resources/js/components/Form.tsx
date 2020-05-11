import { observer } from "mobx-react";
import React from "react";
import { useFormStore } from "../hooks/useFormStore";
import { toJS } from "mobx";
import { fieldMeetsDependencies } from "../utils/filters/fields";
import { FormFieldWithLabel } from "./FormField";

export const Form: React.FC = observer(() => {
	const { fields, submit } = useFormStore();
	console.log(toJS(fields));
	return (
		<div className="Form">
			<form onSubmit={submit}>
				{fields.filter(fieldMeetsDependencies).map(field => (
					<FormFieldWithLabel key={field.id} field={field} />
				))}
				<button type="submit">Submit</button>
			</form>
		</div>
	);
});
