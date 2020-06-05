import { FormField, InputType } from "../../../typings/Form";
import { InputField } from "../../../components/form/InputField";

export const strainField: FormField = {
	label: "strain",
	id: "strain",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text
	},
	default: "",
	value: ""
};
