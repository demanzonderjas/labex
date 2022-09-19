import { TFormField } from "../../../typings/forms";
import { BigTextField } from "../../../components/form/BigTextField";
import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";

export const storageField: TFormField = {
	label: "storage",
	id: TSpecificationName.Storage,
	Component: SelectField,
	props: {
		startsEmpty: true,
		options: ["fresh", "frozen", "liquid_nitrogen", "preserved"],
		allowOther: true
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: "type",
			validate: value => value == "conserved_tissue"
		}
	],
	synonyms: ["storage_method"]
};

export const storageRequestField: TFormField = {
	...storageField
};
