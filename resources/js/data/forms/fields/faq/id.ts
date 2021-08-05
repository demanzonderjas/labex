import { InputField } from "../../../../components/form/InputField";
import { TFormField, InputType, TFormFieldName } from "../../../../typings/Form";

export const idField: TFormField = {
	label: "id",
	id: TFormFieldName.ID,
	required: true,
	hidden: true,
	Component: InputField,
	props: {
		type: InputType.Number
	},
	default: "",
	value: ""
};
