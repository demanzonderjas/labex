import { InputField } from "../../../../components/form/InputField";
import { TFormField, InputType, TFormFieldName } from "../../../../typings/forms";

export const titleField: TFormField = {
	label: "title",
	id: TFormFieldName.Title,
	required: true,
	Component: InputField,
	props: {
		type: InputType.Text
	},
	default: "",
	value: ""
};
