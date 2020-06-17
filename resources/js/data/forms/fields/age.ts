import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";
import { isBiggerThanZero } from "../../../utils/validation/numbers";
import { AgeRangeField } from "../../../components/form/custom-fields/AgeRangeField";
import { isAgeInRange } from "../../../utils/matches/age";
import { getAgeRangeValue } from "../../../utils/getters/fields";

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
	label: "age",
	id: "age",
	Component: AgeRangeField,
	default: "1",
	value: "1",
	customValue: getAgeRangeValue,
	props: {},
	isMatch: isAgeInRange
};

export const ageTypeField: FormField = {
	label: "age_type",
	id: "age_type",
	hidden: true,
	Component: AgeRangeField,
	default: "years",
	value: "years",
	props: {}
};

export const ageMinField: FormField = {
	label: "age_min",
	id: "age_min",
	hidden: true,
	Component: AgeRangeField,
	default: "0",
	value: "0",
	props: {}
};

export const ageMaxField: FormField = {
	label: "age_max",
	id: "age_max",
	hidden: true,
	Component: AgeRangeField,
	default: "20",
	value: "20",
	props: {}
};
