import { InputField } from "../../../components/form/InputField";
import { TFormField, InputType } from "../../../typings/Form";
import { validateEmail } from "../../../utils/validation/string";

export const emailField: TFormField = {
	label: "email",
	id: "email",
	required: true,
	validate: validateEmail,
	Component: InputField,
	props: {
		type: InputType.Email
	},
	default: "",
	value: ""
};
