import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField, InputType } from "../../../typings/forms";

export const protocolNumberField: TFormField = {
	label: "protocol_number",
	id: TSpecificationName.ProtocolNumber,
	Component: InputField,
	ignoreInMatch: true,
	props: {
		type: InputType.Text
	},
	default: "",
	value: "",
	synonyms: ["work_protocol", "protocol", "protocolnumber"]
};
