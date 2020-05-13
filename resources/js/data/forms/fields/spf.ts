import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";

export const spfField: FormField = {
	label: "spf",
	id: "spf",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text
	},
	value: ""
};
