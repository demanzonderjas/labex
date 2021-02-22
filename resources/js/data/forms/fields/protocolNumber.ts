import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";

export const protocolNumberField: FormField = {
	label: "protocol_number",
	id: "protocol_number",
	Component: InputField,
	props: {
		type: InputType.Text
	},
	default: "",
	value: ""
};
