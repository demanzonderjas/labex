import { observer } from "mobx-react";
import React from "react";
import { useFormStore } from "../hooks/useFormStore";
import { toJS } from "mobx";
import { fieldMeetsDependencies } from "../utils/filters/fields";

export const Form: React.FC = observer(() => {
	const { fields, submit } = useFormStore();
	console.log(toJS(fields));
	return (
		<div className="Form">
			<form onSubmit={submit}>
				{fields.filter(fieldMeetsDependencies).map(field => (
					<field.Component
						key={field.id}
						{...field.props}
						id={field.id}
						label={field.label}
						value={field.value}
					/>
				))}
				<button type="submit">Submit</button>
			</form>
		</div>
	);
});
