import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/Form";

export const typeField: TFormField = {
	label: "type",
	id: TSpecificationName.ExchangeType,
	Component: SelectField,
	isHardFilter: true,
	props: {
		startsEmpty: true,
		options: ["animal", "vital_tissue", "conserved_tissue"]
	},
	default: "",
	value: "",
	synonyms: ["type_of", "type_offer", "type_of_material"]
};
