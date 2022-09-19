import { InputField } from "../../../components/form/InputField";
import { SelectField } from "../../../components/form/SelectField";
import { TExchangeAttemptType, TSpecificationName } from "../../../typings/exchanges";
import { TFormField, InputType } from "../../../typings/forms";

export const attemptTypeField: TFormField = {
	label: "attempt_type",
	id: TSpecificationName.AttemptType,
	Component: InputField,
	required: true,
	hidden: true,
	props: {
		type: InputType.Hidden
	},
	default: "",
	value: "",
	synonyms: []
};

export const attemptTypeOfferField = {
	...attemptTypeField,
	value: TExchangeAttemptType.Offer
};

export const attemptTypeRequestField = {
	...attemptTypeField,
	value: TExchangeAttemptType.Request
};

export const attemptTypeAlertField: TFormField = {
	label: "attempt_type",
	id: TSpecificationName.AttemptType,
	Component: SelectField,
	props: {
		options: [TExchangeAttemptType.Offer, TExchangeAttemptType.Request],
		startsEmpty: true,
		allowOther: false
	},
	default: "",
	value: ""
};
