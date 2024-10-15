import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";
import { TTypeSpec } from "../../../typings/specifications";

export const equipmentAvailabilityField: TFormField = {
	label: "availability_type",
	id: TSpecificationName.AvailabilityType,
	Component: SelectField,
	isHardFilter: true,
	props: {
		startsEmpty: true,
		options: ["on_loan", "for_rent", "for_sale", "shared_use", "available_free_of_charge"],
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value === TTypeSpec.Equipment,
		},
	],
};

export const chemicalsAvailabilityField: TFormField = {
	label: "availability_type",
	id: TSpecificationName.AvailabilityType,
	Component: SelectField,
	isHardFilter: true,
	props: {
		startsEmpty: true,
		options: ["for_sale", "shared_use", "available_free_of_charge"],
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value === TTypeSpec.Chemicals,
		},
	],
};

export const reasonForAvailabilityField: TFormField = {
	label: "reason_for_availability",
	id: TSpecificationName.ReasonForAvailability,
	Component: SelectField,
	isHardFilter: true,
	props: {
		startsEmpty: true,
		options: ["redundant", "overdate"],
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value === TTypeSpec.Chemicals,
		},
	],
};
