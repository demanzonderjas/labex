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
	value: "",
	dependencies: [
		{
			id: "origin",
			validate: value => value.match("tissue")
		}
	]
};
