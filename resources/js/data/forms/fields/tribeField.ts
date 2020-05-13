import { SelectField } from "../../../components/form/SelectField";
import { FormField } from "../../../typings/Form";

export const tribeField: FormField = {
	label: "tribe",
	id: "tribe",
	Component: SelectField,
	props: {
		startsEmpty: true,
		options: [
			{ label: "xxl_mouse", value: "xxl_mouse" },
			{ label: "mickey_mouse", value: "mickey_mouse" },
			{ label: "mini_mouse", value: "mini_mouse" }
		]
	},
	value: ""
};
