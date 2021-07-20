import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";
import { isBiggerThanZero } from "../../../utils/validation/numbers";
import { getFieldById } from "../../../utils/getters/fields";
import { SpecStatus, TSpecMatch } from "../../../typings/Sample";

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
	isMatch: (requestedValue, offeredValue, filters, fields): SpecStatus => {
		const isRequest = filters.some(f => f.label == "amount_request");
		const isCompleteMatch = isRequest
			? parseInt(requestedValue) <= parseInt(offeredValue)
			: parseInt(offeredValue) <= parseInt(requestedValue);
		return isCompleteMatch ? SpecStatus.Match : SpecStatus.PartialMatch;
	},
	customValue: fields => `${getFieldById("amount", fields).value} requested`,
	default: "1",
	value: "1",
	synonyms: ["total", "amounts"]
};

export const amountRequestedField: FormField = {
	...amountField,
	label: "amount_request",
	required: false
};
