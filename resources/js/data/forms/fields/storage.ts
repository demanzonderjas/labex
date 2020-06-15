import { FormField } from "../../../typings/Form";
import { BigTextField } from "../../../components/form/BigTextField";
import { SelectField } from "../../../components/form/SelectField";

export const storageField: FormField = {
	label: "storage",
	id: "storage",
	Component: SelectField,
	props: {
		startsEmpty: true,
		options: ["fresh", "frozen", "liquid_nitrogen", "preserved"]
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: "type",
			validate: value => value == "conserved_tissue"
		}
	]
};

export const storageRequestField: FormField = {
	...storageField
};
