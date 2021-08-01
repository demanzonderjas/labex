import { InputField } from "../../../components/form/InputField";
import { TExchangeAttemptType } from "../../../typings/exchanges";
import { TFormField, InputType } from "../../../typings/Form";

export const attemptTypeField: TFormField = {
	label: "attempt_type",
	id: "attempt_type",
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
