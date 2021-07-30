import { BigTextField } from "../../../../components/form/BigTextField";
import { TFormField } from "../../../../typings/Form";

export const contentField: TFormField = {
	label: "content",
	id: "content",
	Component: BigTextField,
	ignoreInMatch: true,
	props: {},
	default: "",
	value: ""
};
