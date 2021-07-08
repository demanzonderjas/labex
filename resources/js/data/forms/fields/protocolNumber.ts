import { InputField } from "../../../components/form/InputField";
import { FormField, InputType } from "../../../typings/Form";

export const protocolNumberField: FormField = {
	label: "protocol_number",
	id: "protocol_number",
	Component: InputField,
	ignoreInMatch: true,
	props: {
		type: InputType.Text
	},
	default: "",
	value: "",
	synonyms: ["work_protocol", "protocol", "protocolnumber"]
};
