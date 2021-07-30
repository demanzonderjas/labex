import { InputField } from "../../../../components/form/InputField";
import { TFormField, InputType } from "../../../../typings/Form";

export const titleField: TFormField = {
	label: "title",
	id: "title",
	required: true,
	Component: InputField,
	props: {
		type: InputType.Text
	},
	default: "",
	value: ""
};
