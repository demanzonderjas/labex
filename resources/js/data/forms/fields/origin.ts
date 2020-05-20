import { SelectField } from "../../../components/form/SelectField";
import { FormField } from "../../../typings/Form";

export const originField: FormField = {
	label: "origin",
	id: "origin",
	Component: SelectField,
	required: true,
	description: "blijft onduidelijk wat hier bedoeld wordt.",
	props: {
		options: ["animal", "fresh_tissue", "conserved_tissue"]
	},
	default: "animal",
	value: "animal"
};
