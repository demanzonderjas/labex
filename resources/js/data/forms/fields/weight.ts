import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";

export const weightField: FormField = {
	label: "weight",
	id: "weight",
	Component: InputField,
	props: {
		type: InputType.Number
	},
	value: "",
	dependencies: [
		{
			id: "weight_type",
			validate: value => value != ""
		}
	]
};
