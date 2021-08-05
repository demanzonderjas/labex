import { BooleanField } from "../../../../components/form/BooleanField";
import { TFormField, TFormFieldName } from "../../../../typings/forms";

export const showField: TFormField = {
	label: "show",
	id: TFormFieldName.Show,
	Component: BooleanField,
	required: true,
	props: {},
	default: "",
	value: ""
};
