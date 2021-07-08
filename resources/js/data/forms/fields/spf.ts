import { SelectField } from "../../../components/form/SelectField";
import { FormField } from "../../../typings/Form";

export const spfField: FormField = {
	label: "spf",
	id: "spf",
	Component: SelectField,
	required: false,
	props: {
		options: ["spf", "conventional", "unknown"],
		startsEmpty: true
	},
	default: "",
	value: "",
	synonyms: []
};
