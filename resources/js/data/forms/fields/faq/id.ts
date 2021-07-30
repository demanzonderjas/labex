import { InputField } from "../../../../components/form/InputField";
import { TFormField, InputType } from "../../../../typings/Form";

export const idField: TFormField = {
	label: "id",
	id: "id",
	required: true,
	hidden: true,
	Component: InputField,
	props: {
		type: InputType.Number
	},
	default: "",
	value: ""
};
