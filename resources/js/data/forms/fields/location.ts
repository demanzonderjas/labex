import { TFormField, InputType } from "../../../typings/forms";
import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";

export const locationField: TFormField = {
	label: "location",
	id: TSpecificationName.Location,
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text
	},
	default: "",
	value: "",
	synonyms: ["locations"]
};
