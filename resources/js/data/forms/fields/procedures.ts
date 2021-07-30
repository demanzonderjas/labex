import { TFormField } from "../../../typings/Form";
import { BigTextField } from "../../../components/form/BigTextField";

export const proceduresField: TFormField = {
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
