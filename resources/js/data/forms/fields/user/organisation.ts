import { InputField } from "../../../../components/form/InputField";
import { InputType, TFormField, TFormFieldName } from "../../../../typings/forms";

export const organisationField: TFormField = {
	label: "organisation",
	id: TFormFieldName.Organisation,
	required: true,
	Component: InputField,
	props: {
		type: InputType.Text
	},
	default: "",
	value: ""
};
