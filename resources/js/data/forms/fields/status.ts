import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";
import { TSpecStatus } from "../../../typings/specifications";

export const statusField: TFormField = {
	label: "status",
	id: TSpecificationName.Status,
	Component: SelectField,
	required: false,
	isHardFilter: true,
	props: {
		options: ["active", "inactive", "on-hold"],
		startsEmpty: true,
	},
	default: "",
	value: "",
	synonyms: [],
};
