import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";
import { isBiggerThanZero } from "../../../utils/validation/numbers";
import { AgeRangeField } from "../../../components/form/custom-fields/AgeRangeField";

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
	default: "",
	value: "",
	props: {}
};

export const ageTypeField: FormField = {
	label: "age_type",
	id: "age_type",
	hidden: true,
	Component: AgeRangeField,
	default: "",
	value: "",
	props: {}
};

export const ageMinField: FormField = {
	label: "age_min",
	id: "age_min",
	hidden: true,
	Component: AgeRangeField,
	default: "",
	value: "",
	props: {}
};

export const ageMaxField: FormField = {
	label: "age_max",
	id: "age_max",
	hidden: true,
	Component: AgeRangeField,
	default: "",
	value: "",
	props: {}
};
