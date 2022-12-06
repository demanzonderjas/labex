import { BooleanField } from "../../../components/form/BooleanField";
import { AdoptionAmountField } from "../../../components/form/custom-fields/AdoptionAmountField";
import { AdoptionCodeField } from "../../../components/form/custom-fields/AdoptionCodeField";
import { InputField } from "../../../components/form/InputField";
import { TExchangeAttempt, TSpecificationName } from "../../../typings/exchanges";
import { InputType, TFormField, TFormFieldName } from "../../../typings/forms";
import { TSpecStatus } from "../../../typings/specifications";
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

export const adoptionCodeSearchField: TFormField = {
	...adoptionCodeField,
	Component: InputField,
	required: false,
	isHardFilter: true,
	isMatch: (givenValue, _, __, ___, attempt: TExchangeAttempt) => {
		console.log(givenValue, attempt);
		if (!attempt || (!attempt.adoption_info && givenValue)) {
			return TSpecStatus.NoMatch;
		}
		return attempt.adoption_info.code.toLowerCase().match(givenValue.toLowerCase())
			? TSpecStatus.Match
			: TSpecStatus.NoMatch;
	}
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
