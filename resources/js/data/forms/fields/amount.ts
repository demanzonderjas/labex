import { InputField } from "../../../components/form/InputField";
import { TFormField, InputType } from "../../../typings/Form";
import { isBiggerThanZero } from "../../../utils/validation/numbers";
import { getFieldById } from "../../../utils/getters/fields";
import { TSpecStatus, TSpecMatch } from "../../../typings/Sample";
import { TSpecificationName } from "../../../typings/exchanges";

export const amountField: TFormField = {
	label: "amount",
	id: TSpecificationName.Amount,
	Component: InputField,
	required: true,
	validate: isBiggerThanZero,
	props: {
		type: InputType.Number,
		min: 0
	},
	isMatch: (requestedValue, offeredValue, filters, fields): TSpecStatus => {
		const isRequest = filters.some(f => f.label == "amount_request");
		const isCompleteMatch = isRequest
			? parseInt(requestedValue) <= parseInt(offeredValue)
			: parseInt(offeredValue) <= parseInt(requestedValue);
		return isCompleteMatch ? TSpecStatus.Match : TSpecStatus.PartialMatch;
	},
	customValue: fields => `${getFieldById(TSpecificationName.Amount, fields).value} requested`,
	default: "1",
	value: "1",
	synonyms: ["total", "amounts"]
};

export const amountRequestedField: TFormField = {
	...amountField,
	label: "amount_request",
	required: false
};
