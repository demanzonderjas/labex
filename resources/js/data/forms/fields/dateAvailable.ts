import { InputField } from "../../../components/form/InputField";
import { TFormField, InputType } from "../../../typings/forms";
import {
	isDateAvailableEndValid,
	isDateAvailableStartValid,
	isDateInFuture,
	isDateInRangeOfTwoWeeks,
	isDateRequestedAfterStartDate
} from "../../../utils/validation/date";
import { getFieldById } from "../../../utils/getters/fields";
import { TSpecStatus } from "../../../typings/specifications";
import { TSpecificationName } from "../../../typings/exchanges";
import { TTypeSpec } from "../../../typings/specifications";
import { YearSelectField } from "../../../components/form/custom-fields/YearSelectField";
import dayjs from "dayjs";

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
	validate: isDateAvailableStartValid,
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
	id: TSpecificationName.DateAvailableEnd,
	validate: isDateAvailableEndValid
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

export const yearSelectField: TFormField = {
	id: TSpecificationName.DateAvailableStart,
	Component: YearSelectField,
	default: "",
	value: "",
	isHardFilter: true,
	label: "select_year",
	props: {},
	isMatch: (givenValue, targetValue) => {
		const targetYear = dayjs(targetValue).year();
		return targetYear == givenValue ? TSpecStatus.Match : TSpecStatus.NoMatch;
	}
};
