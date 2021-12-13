import { InputField } from "../../../components/form/InputField";
import { TFormField, InputType } from "../../../typings/forms";
import {
	isDateInFuture,
	isDateInRangeOfTwoWeeks,
	isDateRequestedAfterStartDate
} from "../../../utils/validation/date";
import { getFieldById } from "../../../utils/getters/fields";
import { TSpecStatus } from "../../../typings/specifications";
import { TSpecificationName } from "../../../typings/exchanges";
import { TTypeSpec } from "../../../typings/specifications";

export const dateAvailableStartField: TFormField = {
	label: "date_available_start",
	id: TSpecificationName.DateAvailableStart,
	Component: InputField,
	required: true,
	props: {
		type: InputType.Date
	},
	default: "",
	matchVia: TSpecificationName.DateRequested,
	value: "",
	validate: isDateInFuture,
	isMatch: (givenValue, targetValue, filters, fields): TSpecStatus => {
		const type = getFieldById(TSpecificationName.ExchangeType, fields);
		const dateRequested = getFieldById(TSpecificationName.DateRequested, fields);
		const dateAvailable = getFieldById(TSpecificationName.DateAvailableEnd, fields);
		const dateAvailableStart = getFieldById(TSpecificationName.DateAvailableStart, fields);
		return (isDateInRangeOfTwoWeeks(givenValue, dateAvailable.value) &&
			isDateRequestedAfterStartDate(givenValue, dateAvailableStart?.value)) ||
			(type && type.value == TTypeSpec.ConservedTissue)
			? TSpecStatus.Match
			: TSpecStatus.NoMatch;
	},
	dependencies: [
		{
			id: "type",
			validate: value => value == "animal" || value == "vital_tissue"
		}
	],
	synonyms: ["available", "availability", "date"]
};

export const dateAvailableEndField: TFormField = {
	...dateAvailableStartField,
	label: "date_available_end",
	id: TSpecificationName.DateAvailableEnd
};

export const dateRequestedField: TFormField = {
	...dateAvailableStartField,
	required: false,
	label: "date_requested",
	id: TSpecificationName.DateRequested,
	matchVia: null,
	isMatch: (givenValue, targetValue, filters, fields): TSpecStatus => {
		const type = getFieldById(TSpecificationName.ExchangeType, fields);
		const dateAvailable = getFieldById(TSpecificationName.DateAvailableEnd, fields);
		const dateAvailableStart = getFieldById(TSpecificationName.DateAvailableStart, fields);
		return (isDateInRangeOfTwoWeeks(givenValue, dateAvailable.value) &&
			isDateRequestedAfterStartDate(givenValue, dateAvailableStart?.value)) ||
			(type && type.value == TTypeSpec.ConservedTissue)
			? TSpecStatus.Match
			: TSpecStatus.NoMatch;
	},
	validate: undefined,
	dependencies: []
};
