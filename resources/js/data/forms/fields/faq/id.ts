import { InputField } from "../../../../components/form/InputField";
import { FormField, InputType } from "../../../../typings/Form";

export const idField: FormField = {
	label: "id",
    id: "id",
    required: true,
    hidden: true,
	Component: InputField,
	props: {
		type: InputType.Number
	},
	default: "",
	value: "",
};
