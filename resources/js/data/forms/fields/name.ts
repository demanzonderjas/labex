import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";

export const nameField: FormField = {
	label: "name",
    id: "name",
    required: true,
	Component: InputField,
	props: {
		type: InputType.Text
	},
	default: "",
	value: "",
};
