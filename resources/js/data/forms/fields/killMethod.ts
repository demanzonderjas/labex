import { SelectField } from "../../../components/form/SelectField";
import { FormField } from "../../../typings/Form";

export const killMethodField: FormField = {
	label: "kill_method",
	id: "kill_method",
	Component: SelectField,
	props: {
		options: [
			"co2_o2",
			"cervical_dislocation",
			"decapitation",
			"terminal_anesthesia",
			"overdose_of_euthasate",
			"electrocution"
		],
		startsEmpty: true,
		allowOther: true
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: "origin",
			validate: value => value.match("tissue")
		}
	]
};
