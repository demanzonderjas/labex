import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField, InputType } from "../../../typings/Form";

export const sampleNumberField: TFormField = {
	label: "sample_number",
	id: TSpecificationName.SampleNumber,
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text
	},
	default: "",
	value: "",
	synonyms: ["samplenumber", "number"]
};

export const sampleNumberRequestField: TFormField = {
	...sampleNumberField,
	required: false
};
