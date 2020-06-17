import { SelectField } from "../../../components/form/SelectField";
import { FormField } from "../../../typings/Form";

export const originField: FormField = {
	label: "origin",
	id: "origin",
	Component: SelectField,
	props: {
		options: ["experiment", "breeding", "other"],
		startsEmpty: true
	},
	default: "",
	value: ""
};
