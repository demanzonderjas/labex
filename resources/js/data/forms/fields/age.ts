import { InputField } from "../../../components/form/InputField";
import { TFormField, InputType } from "../../../typings/forms";
import { AgeRangeField } from "../../../components/form/custom-fields/AgeRangeField";
import { isAgeInRange, isAgeRangeMatching } from "../../../utils/matches/age";
import { getAgeRangeValue } from "../../../utils/getters/fields";
import { TSpecificationName } from "../../../typings/exchanges";
import { isDateInPast } from "../../../utils/validation/date";

export const ageField: TFormField = {
	label: "age",
	id: TSpecificationName.Age,
	Component: InputField,
	required: true,
	validate: isDateInPast,
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
	id: TSpecificationName.Age,
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
	id: TSpecificationName.Age,
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
	id: TSpecificationName.AgeType,
	hidden: true,
	Component: AgeRangeField,
	default: "weeks",
	value: "weeks",
	props: {}
};

export const ageMinField: TFormField = {
	label: "age_min",
	id: TSpecificationName.AgeMin,
	hidden: true,
	Component: AgeRangeField,
	default: "0",
	value: "0",
	props: {}
};

export const ageMaxField: TFormField = {
	label: "age_max",
	id: TSpecificationName.AgeMax,
	hidden: true,
	Component: AgeRangeField,
	default: "20",
	value: "20",
	props: {}
};
