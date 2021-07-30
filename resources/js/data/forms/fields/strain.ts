import { TFormField, InputType } from "../../../typings/Form";
import { InputField } from "../../../components/form/InputField";

export const strainField: TFormField = {
	label: "strain",
	id: "strain",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text
	},
	default: "",
	value: "",
	synonyms: ["strain"]
};

export const strainRequestField: TFormField = {
	...strainField,
	required: false
};
