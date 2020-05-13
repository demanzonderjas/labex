import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";

export const ageField: FormField = {
	label: "age",
	id: "age",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Number
	},
	value: ""
};
