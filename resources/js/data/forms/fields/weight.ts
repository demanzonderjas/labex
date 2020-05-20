import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";
import { isBiggerThanZero } from "../../../utils/validation/numbers";

export const weightField: FormField = {
	label: "weight",
	id: "weight",
	Component: InputField,
	validate: isBiggerThanZero,
	props: {
		type: InputType.Number
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: "weight_type",
			validate: value => value != ""
		}
	]
};
