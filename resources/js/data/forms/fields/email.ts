import { InputField } from "../../../components/form/InputField";
import { TFormField, InputType, TFormFieldName } from "../../../typings/Form";
import { validateEmail } from "../../../utils/validation/string";

export const emailField: TFormField = {
	label: "email",
	id: TFormFieldName.Email,
	required: true,
	validate: validateEmail,
	Component: InputField,
	props: {
		type: InputType.Email
	},
	default: "",
	value: ""
};
