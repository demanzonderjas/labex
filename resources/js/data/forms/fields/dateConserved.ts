import { FormField, InputType } from "../../../typings/Form";
import { InputField } from "../../../components/form/InputField";

export const dateConservedField: FormField = {
	label: "date_conserved",
	id: "date_conserved",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Date
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: "type",
			validate: value => value == "conserved_tissue"
		}
	]
};
