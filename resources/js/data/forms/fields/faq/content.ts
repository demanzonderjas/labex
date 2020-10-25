import { BigTextField } from "../../../../components/form/BigTextField";
import { FormField } from "../../../../typings/Form";

export const contentField: FormField = {
	label: "content",
	id: "content",
	Component: BigTextField,
	ignoreInMatch: true,
	props: {},
	default: "",
	value: ""
};