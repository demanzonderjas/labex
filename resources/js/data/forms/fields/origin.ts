import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";

export const originField: TFormField = {
	label: "origin",
	id: TSpecificationName.Origin,
	Component: SelectField,
	props: {
		options: ["experiment", "breeding"],
		startsEmpty: true,
		allowOther: true
	},
	default: "",
	value: "",
	synonyms: ["herkomst"]
};
