import { FormField, InputType } from "../../../typings/Form";
import { InputField } from "../../../components/form/InputField";
import { isAgeInRange } from "../../../utils/matches/age";

export const dateConservedField: FormField = {
	label: "date_conserved",
	id: "age",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Date
	},
	isMatch: isAgeInRange,
	default: "",
	value: "",
	dependencies: [
		{
			id: "type",
			validate: value => value == "conserved_tissue"
		}
	]
};
