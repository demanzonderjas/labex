import { InputField } from "../../../../components/form/InputField";
import { FormField, InputType } from "../../../../typings/Form";

export const titleField: FormField = {
	label: "title",
    id: "title",
    required: true,
	Component: InputField,
	props: {
		type: InputType.Text
	},
	default: "",
	value: "",
};
