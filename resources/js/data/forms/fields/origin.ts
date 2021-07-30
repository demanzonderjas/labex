import { SelectField } from "../../../components/form/SelectField";
import { TFormField } from "../../../typings/Form";

export const originField: TFormField = {
	label: "origin",
	id: "origin",
	Component: SelectField,
	props: {
		options: ["experiment", "breeding"],
		startsEmpty: true,
		allowOther: true
	},
	default: "",
	value: "",
	synonyms: ["herkomst"]
};
