import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";

export const otherField: FormField = {
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
