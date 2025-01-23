import { RichTextField } from "../../../../components/form/RichTextField";
import { TFormField, TFormFieldName } from "../../../../typings/forms";

export const contentField: TFormField = {
	label: "content",
	id: TFormFieldName.Content,
	Component: RichTextField,
	ignoreInMatch: true,
	props: {},
	default: "",
	value: "",
};
