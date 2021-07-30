import { TFormField } from "../../../typings/Form";
import { BigTextField } from "../../../components/form/BigTextField";
import { SelectField } from "../../../components/form/SelectField";

export const storageField: TFormField = {
	label: "storage",
	id: "storage",
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
