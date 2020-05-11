import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";

export const ageField: FormField = {
	label: "age",
	id: "age",
	Component: InputField,
	props: {
		type: InputType.Number
	},
	value: ""
};
