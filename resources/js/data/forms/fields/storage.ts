import { FormField } from "../../../typings/Form";
import { BigTextField } from "../../../components/form/BigTextField";

export const storageField: FormField = {
	label: "storage",
	id: "storage",
	Component: BigTextField,
	props: {},
	value: "",
	dependencies: [
		{
			id: "origin",
			validate: value => value.match("tissue")
		}
	]
};
