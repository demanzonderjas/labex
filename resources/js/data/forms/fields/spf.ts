import { SelectField } from "../../../components/form/SelectField";
import { TFormField } from "../../../typings/Form";

export const spfField: TFormField = {
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
