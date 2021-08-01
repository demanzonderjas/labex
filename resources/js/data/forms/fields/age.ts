import { InputField } from "../../../components/form/InputField";
import { TFormField, InputType } from "../../../typings/Form";
import { isBiggerThanZero } from "../../../utils/validation/numbers";
import { AgeRangeField } from "../../../components/form/custom-fields/AgeRangeField";
import { isAgeInRange, isAgeRangeMatching } from "../../../utils/matches/age";
import { getAgeRangeValue } from "../../../utils/getters/fields";

export const ageField: TFormField = {
	label: "age",
	id: "age",
	Component: InputField,
	required: true,
	validate: isBiggerThanZero,
	isMatch: isAgeInRange,
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
	],
	synonyms: ["birth_date"]
};

export const ageRequestField: TFormField = {
	label: "age_offer",
	id: "age",
	Component: AgeRangeField,
	default: "1",
	value: "1",
	customValue: getAgeRangeValue,
	props: {},
	isMatch: isAgeInRange,
	synonyms: ["birth_date", "age"]
};

export const ageRangeRequestField: TFormField = {
	...ageRequestField,
	label: "age_range"
};

export const ageRequestRangeField: TFormField = {
	label: "age_range",
	id: "age",
	Component: AgeRangeField,
	default: "1",
	value: "1",
	customValue: getAgeRangeValue,
	props: {},
	isMatch: isAgeRangeMatching,
	synonyms: ["birth_date", "age"]
};

export const ageTypeField: TFormField = {
	label: "age_type",
	id: "age_type",
	hidden: true,
	Component: AgeRangeField,
	default: "weeks",
	value: "weeks",
	props: {}
};

export const ageMinField: TFormField = {
	label: "age_min",
	id: "age_min",
	hidden: true,
	Component: AgeRangeField,
	default: "0",
	value: "0",
	props: {}
};

export const ageMaxField: TFormField = {
	label: "age_max",
	id: "age_max",
	hidden: true,
	Component: AgeRangeField,
	default: "20",
	value: "20",
	props: {}
};
