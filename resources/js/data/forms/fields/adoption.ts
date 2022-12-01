import { BooleanField } from "../../../components/form/BooleanField";
import { AdoptionCodeField } from "../../../components/form/custom-fields/AdoptionCodeField";
import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";
import { InputType, TFormField, TFormFieldName } from "../../../typings/forms";

export const adoptionField: TFormField = {
	label: "suitable_for_adoption",
	id: TSpecificationName.SuitableForAdoption,
	Component: BooleanField,
	required: true,
	isHardFilter: true,
	description: "suitable_for_adoption_description",
	props: {},
	default: "",
	value: ""
};

export const adoptionFilterField: TFormField = {
	...adoptionField,
	required: false
};

export const adoptionCodeField: TFormField = {
	label: "adoption_code",
	Component: AdoptionCodeField,
	id: TFormFieldName.AdoptionCode,
	props: {},
	value: "",
	default: ""
};

export const userField: TFormField = {
	label: "user",
	hidden: true,
	id: TFormFieldName.User,
	required: false,
	Component: null,
	props: {},
	default: "",
	value: ""
};
