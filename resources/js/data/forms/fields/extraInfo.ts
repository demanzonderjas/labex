import { TFormField } from "../../../typings/forms";
import { BigTextField } from "../../../components/form/BigTextField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TTypeSpec } from "../../../typings/specifications";

export const extraInfoField: TFormField = {
	label: "extra_info",
	id: TSpecificationName.ExtraInfo,
	Component: BigTextField,
	ignoreInMatch: true,
	props: {},
	default: "",
	value: "",
	synonyms: ["info", "extra", "information", "extra_information"],
};

export const specificationsField: TFormField = {
	...extraInfoField,
	label: "specifications",
	description: "specifications_description",
	id: TSpecificationName.Specifications,
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value === TTypeSpec.Equipment,
		},
	],
};

export const contactDetailsField: TFormField = {
	...extraInfoField,
	label: "contact_details",
	id: TSpecificationName.ContactDetails,
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value === TTypeSpec.Equipment || value === TTypeSpec.Chemicals,
		},
	],
};
