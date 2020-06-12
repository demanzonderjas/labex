import { SelectField } from "../../../components/form/SelectField";
import { FormField } from "../../../typings/Form";

export const spfField: FormField = {
	label: "spf",
	id: "spf",
	Component: SelectField,
	props: {
		options: ["spf", "conventional", "unknown"]
	},
	default: "",
	value: "spf"
};
