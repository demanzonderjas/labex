import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";

export const spfField: TFormField = {
	label: "spf",
	id: TSpecificationName.SPF,
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
