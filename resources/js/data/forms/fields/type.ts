import { SelectField } from "../../../components/form/SelectField";
import { FormField } from "../../../typings/Form";

export const typeField: FormField = {
	label: "type",
	id: "type",
	Component: SelectField,
	isHardFilter: true,
	props: {
		startsEmpty: true,
		options: ["animal", "vital_tissue", "conserved_tissue"]
	},
	default: "",
	value: ""
};
