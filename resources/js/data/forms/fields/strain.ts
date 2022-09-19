import { TFormField, InputType } from "../../../typings/forms";
import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";

export const strainField: TFormField = {
	label: "strain",
	id: TSpecificationName.Strain,
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
