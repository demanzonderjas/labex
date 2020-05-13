import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";

export const dateAvailableField: FormField = {
	label: "date_available",
	id: "date_available",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Date
	},
	value: "",
	dependencies: [
		{
			id: "origin",
			validate: value => value == "fresh_tissue" || value == "animal"
		}
	]
};
