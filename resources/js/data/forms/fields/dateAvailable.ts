import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";
import { isDateInFuture, isDateInRangeOfTwoWeeks } from "../../../utils/validation/date";
import { getFieldById } from "../../../utils/getters/fields";

export const dateAvailableField: FormField = {
	label: "date_available",
	id: "date_available",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Date
	},
	default: "",
	value: "",
	validate: isDateInFuture,
	dependencies: [
		{
			id: "type",
			validate: value => value == "animal" || value == "vital_tissue"
		}
	]
};

export const dateRequestedField: FormField = {
	...dateAvailableField,
	required: false,
	label: "date_requested",
	id: "date_requested",
	isMatch: (givenValue, targetValue, filters, fields) => {
		const dateAvailable = getFieldById("date_available", fields);
		return isDateInRangeOfTwoWeeks(givenValue, dateAvailable.value);
	},
	validate: undefined,
	dependencies: []
};
