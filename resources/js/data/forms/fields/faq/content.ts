import { BigTextField } from "../../../../components/form/BigTextField";
import { TFormField, TFormFieldName } from "../../../../typings/Form";

export const contentField: TFormField = {
	label: "content",
	id: TFormFieldName.Content,
	Component: BigTextField,
	ignoreInMatch: true,
	props: {},
	default: "",
	value: ""
};
