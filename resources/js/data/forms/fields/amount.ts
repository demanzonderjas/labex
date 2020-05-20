import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";
import { isBiggerThanZero } from "../../../utils/validation/numbers";

export const amountField: FormField = {
	label: "amount",
	id: "amount",
	Component: InputField,
	required: true,
	validate: isBiggerThanZero,
	props: {
		type: InputType.Number
	},
	default: "1",
	value: "1"
};

export const amountRequestedField: FormField = {
	...amountField,
	label: "amount_request",
	description: "Moeilijk te beantwoorden voor (stuk) weefsel. Niet eisen?",
	required: false
};
