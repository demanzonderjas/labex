import { InputField } from "../../../components/form/InputField";
import { TFormField, InputType } from "../../../typings/Form";
import { isDateInFuture, isDateInRangeOfTwoWeeks } from "../../../utils/validation/date";
import { getFieldById } from "../../../utils/getters/fields";
import { TSpecStatus } from "../../../typings/Sample";
import { TSpecificationName } from "../../../typings/exchanges";
import { TTypeSpec } from "../../../typings/specifications";

export const dateAvailableField: TFormField = {
	label: "date_available",
	id: TSpecificationName.DateAvailable,
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
	],
	synonyms: ["available", "availability", "date"]
};

export const dateRequestedField: TFormField = {
	...dateAvailableField,
	required: false,
	label: "date_requested",
	id: TSpecificationName.DateRequested,
	isMatch: (givenValue, targetValue, filters, fields): TSpecStatus => {
		const type = getFieldById(TSpecificationName.ExchangeType, fields);
		const dateAvailable = getFieldById(TSpecificationName.DateAvailable, fields);
		return isDateInRangeOfTwoWeeks(givenValue, dateAvailable.value) ||
			(type && type.value == TTypeSpec.ConservedTissue)
			? TSpecStatus.Match
			: TSpecStatus.NoMatch;
	},
	validate: undefined,
	dependencies: []
};
