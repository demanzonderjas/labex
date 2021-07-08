import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";

export const sampleNumberField: FormField = {
	label: "sample_number",
	id: "sample_number",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text
	},
	default: "",
	value: "",
	synonyms: ["samplenumber", "number"]
};

export const sampleNumberRequestField: FormField = {
	...sampleNumberField,
	required: false
};
