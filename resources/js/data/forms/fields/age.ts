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
		type: InputType.Number
	},
	value: ""
};

export const ageRequestField: FormField = {
	...ageField,
	required: false,
	dependencies: [
		{
			id: "is_age_relevant",
			validate: value => value == "yes"
		}
	]
};
