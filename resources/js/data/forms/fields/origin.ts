import { SelectField } from "../../../components/form/SelectField";
import { FormField } from "../../../typings/Form";

export const originField: FormField = {
	label: "origin",
	id: "origin",
	Component: SelectField,
	required: true,
	props: {
		options: [
			{ label: "animal", value: "animal" },
			{ label: "fresh_tissue", value: "fresh_tissue" },
			{ label: "conserved_tissue", value: "conserved_tissue" }
		]
	},
	value: "animal"
};
