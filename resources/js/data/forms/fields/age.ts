import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";
import { isBiggerThanZero } from "../../../utils/validation/numbers";

export const ageField: FormField = {
	label: "age",
	id: "age",
	Component: InputField,
	required: true,
	validate: isBiggerThanZero,
	props: {
		type: InputType.Date
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: "type",
			validate: value => value == "animal" || value == "vital_tissue"
		}
	]
};

export const ageRequestField: FormField = {
	...ageField,
	required: false
};
