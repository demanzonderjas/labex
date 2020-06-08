import { FormField } from "../../../typings/Form";
import { BooleanField } from "../../../components/form/BooleanField";

export const protocolNumberKnownField: FormField = {
	label: "protocol_number_known",
	id: "protocol_number_known",
	Component: BooleanField,
	required: true,
	description: "",
	props: {},
	default: "",
	value: ""
};
