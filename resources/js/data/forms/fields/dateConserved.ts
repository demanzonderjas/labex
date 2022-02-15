import { TFormField, InputType } from "../../../typings/forms";
import { InputField } from "../../../components/form/InputField";
import { isAgeInRange } from "../../../utils/matches/age";
import { TSpecificationName } from "../../../typings/exchanges";
import { isDateInPast } from "../../../utils/validation/date";

export const dateConservedField: TFormField = {
	label: "date_conserved",
	id: TSpecificationName.Age,
	Component: InputField,
	required: true,
	props: {
		type: InputType.Date
	},
	isMatch: isAgeInRange,
	validate: isDateInPast,
	default: "",
	value: "",
	dependencies: [
		{
			id: "type",
			validate: value => value == "conserved_tissue"
		}
	],
	synonyms: ["available", "availability", "date"]
};
