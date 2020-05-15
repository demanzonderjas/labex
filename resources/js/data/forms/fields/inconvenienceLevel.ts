import { FormField } from "../../../typings/Form";
import { BigTextField } from "../../../components/form/BigTextField";
import { SelectField } from "../../../components/form/SelectField";

export const inconvenienceLevelField: FormField = {
	label: "inconvenience_level",
	id: "inconvenience_level",
	Component: SelectField,
	props: {
		startsEmpty: true,
		options: ["light", "moderate", "grave"]
	},
	value: "",
	dependencies: [
		{
			id: "naive",
			validate: value => value == "yes"
		},
		{
			id: "origin",
			validate: value => value == "animal"
		}
	]
};
