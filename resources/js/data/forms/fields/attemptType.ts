import { InputField } from "../../../components/form/InputField";
import { TExchangeAttemptType } from "../../../typings/Base";
import { FormField, InputType } from "../../../typings/Form";

export const attemptTypeField: FormField = {
	label: "attempt_type",
	id: "attempt_type",
	Component: InputField,
	required: true,
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
