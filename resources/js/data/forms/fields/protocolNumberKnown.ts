import { FormField } from "../../../typings/Form";
import { BooleanField } from "../../../components/form/BooleanField";

export const protocolNumberKnownField: FormField = {
	label: "protocol_number_known",
	id: "protocol_number_known",
	Component: BooleanField,
	required: true,
	description:
		"Keuze uit: werkprotocol nummers en geen werkprotocolnummer bekend. Wanneer het nummer niet bekend is dan moet de IvD beoordelen of het weefsel/proefdier aangeboden mag worden.",
	props: {},
	default: "",
	value: ""
};
