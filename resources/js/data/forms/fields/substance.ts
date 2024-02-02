import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";
import { TTypeSpec } from "../../../typings/specifications";
import { extraInfoField } from "./extraInfo";

export const substanceCategoryField: TFormField = {
	label: "substance_category",
	id: TSpecificationName.SubstanceCategory,
	Component: SelectField,
	isHardFilter: true,
	props: {
		startsEmpty: true,
		options: ["A", "B", "C", "D"],
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

export const substanceDetailsField: TFormField = {
	...extraInfoField,
	label: "substance_details",
	description: "substance_details_description",
	id: TSpecificationName.SubstanceDetails,
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value === TTypeSpec.Chemicals,
		},
	],
};
