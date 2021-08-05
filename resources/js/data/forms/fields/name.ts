import { InputField } from "../../../components/form/InputField";
import { TFormField, InputType, TFormFieldName } from "../../../typings/forms";

export const nameField: TFormField = {
	label: "name",
	id: TFormFieldName.Name,
	required: true,
	Component: InputField,
	props: {
		type: InputType.Text
	},
	default: "",
	value: ""
};
