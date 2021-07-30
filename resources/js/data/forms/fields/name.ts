import { InputField } from "../../../components/form/InputField";
import { TFormField, InputType } from "../../../typings/Form";

export const nameField: TFormField = {
	label: "name",
	id: "name",
	required: true,
	Component: InputField,
	props: {
		type: InputType.Text
	},
	default: "",
	value: ""
};
