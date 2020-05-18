import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";

export const amountField: FormField = {
	label: "amount",
	id: "amount",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Number
	},
	value: "1"
};

export const amountRequestedField: FormField = {
	...amountField,
	label: "amount_request",
	description: "Moeilijk te beantwoorden voor (stuk) weefsel. Niet eisen?",
	required: false,
	value: "0"
};
