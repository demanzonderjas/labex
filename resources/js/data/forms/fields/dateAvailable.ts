import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";
import { isDateInFuture } from "../../../utils/validation/date";

export const dateAvailableField: FormField = {
	label: "date_available",
	id: "date_available",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Date
	},
	value: "",
	validate: isDateInFuture,
	dependencies: [
		{
			id: "origin",
			validate: value => value == "fresh_tissue" || value == "animal"
		}
	]
};

export const dateRequestedField: FormField = {
	...dateAvailableField,
	label: "date_available",
	id: "date_available"
};
