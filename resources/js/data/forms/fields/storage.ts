import { TFormField } from "../../../typings/forms";
import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TTypeSpec } from "../../../typings/specifications";

export const storageField: TFormField = {
	label: "storage",
	id: TSpecificationName.Storage,
	Component: SelectField,
	props: {
		startsEmpty: true,
		options: ["chilled", "in_freezer", "room_temperature", "liquid_nitrogen"],
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value == TTypeSpec.Chemicals,
		},
	],
	synonyms: ["storage_method"],
};

export const storageRequestField: TFormField = {
	...storageField,
};
