import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";
import { isBiggerThanZero } from "../../../utils/validation/numbers";
import { getFieldById } from "../../../utils/getters/fields";

export const amountField: FormField = {
	label: "amount",
	id: "amount",
	Component: InputField,
	required: true,
	validate: isBiggerThanZero,
	props: {
		type: InputType.Number,
		min: 0
	},
	customValue: fields => `${getFieldById("amount", fields).value} requested`,
	default: "1",
	value: "1",
	dependencies: [
		{
			id: "type",
			validate: value => value == "animal"
		}
	]
};

export const amountRequestedField: FormField = {
	...amountField,
	isMatch: (requestedValue, offeredValue) => parseInt(requestedValue) <= parseInt(offeredValue),
	label: "amount_request",
	required: false
};
