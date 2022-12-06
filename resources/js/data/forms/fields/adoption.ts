import { BooleanField } from "../../../components/form/BooleanField";
import { AdoptionAmountField } from "../../../components/form/custom-fields/AdoptionAmountField";
import { AdoptionCodeField } from "../../../components/form/custom-fields/AdoptionCodeField";
import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";
import { InputType, TFormField, TFormFieldName } from "../../../typings/forms";
import { isBiggerThanZero } from "../../../utils/validation/numbers";

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
	required: true,
	props: {},
	value: "",
	default: ""
};

export const adoptionAmountField: TFormField = {
	label: "adoption_amount",
	id: TFormFieldName.AdoptionAmount,
	Component: AdoptionAmountField,
	required: true,
	validate: null,
	props: {},
	default: "0",
	value: "0"
};

export const isActiveField: TFormField = {
	label: "is_active",
	id: TSpecificationName.Status,
	Component: BooleanField,
	required: true,
	transform: (value: any) => {
		if (value === "active") {
			return "yes";
		} else if (value === "inactive") {
			return "no";
		} else {
			return value;
		}
	},
	props: {},
	default: "",
	value: ""
};
