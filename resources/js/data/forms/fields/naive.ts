import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";

export const naiveField: FormField = {
	label: "naive",
	id: "naive",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text
	},
	value: ""
};
