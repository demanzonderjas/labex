import { PasswordGeneratorField } from "../../../../components/form/custom-fields/PasswordGenerator";
import { TFormField, TFormFieldName } from "../../../../typings/forms";

export const passwordField: TFormField = {
	label: "generate_password",
	description: "copy_password_before_saving",
	id: TFormFieldName.Password,
	required: true,
	Component: PasswordGeneratorField,
	props: {},
	default: "",
	value: ""
};
