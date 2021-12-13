import { PasswordGeneratorField } from "../../../../components/form/custom-fields/PasswordGenerator";
import { InputField } from "../../../../components/form/InputField";
import { InputType, TFormField, TFormFieldName } from "../../../../typings/forms";

export const passwordGeneratorField: TFormField = {
	label: "generate_password",
	description: "copy_password_before_saving",
	id: TFormFieldName.Password,
	required: true,
	Component: PasswordGeneratorField,
	props: {},
	default: "",
	value: ""
};

export const passwordField: TFormField = {
	label: "password",
	id: TFormFieldName.Password,
	required: true,
	Component: InputField,
	props: {
		type: InputType.Password
	},
	default: "",
	value: ""
};
