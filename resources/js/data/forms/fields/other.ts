import { InputField } from "../../../components/form/InputField";
import { TFormField, InputType } from "../../../typings/Form";

export const otherField: TFormField = {
	label: "other",
	id: "other",
	Component: InputField,
	props: {
		type: InputType.Text
	},
	default: "",
	value: "",
	hidden: true
};
