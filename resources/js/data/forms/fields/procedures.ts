import { FormField } from "../../../typings/Form";
import { BigTextField } from "../../../components/form/BigTextField";

export const proceduresField: FormField = {
	label: "procedures",
	id: "procedures",
	Component: BigTextField,
	props: {},
	default: "",
	value: "",
	description: "",
	dependencies: [
		{
			id: "naive",
			validate: value => value == "no"
		}
	]
};
