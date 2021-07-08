import { FormField } from "../../../typings/Form";
import { MultiSelectField } from "../../../components/form/MultiSelectField";
import { isMultiSelectMatch } from "../../../utils/filters/multiselect";

export const organsField: FormField = {
	label: "organs",
	id: "organs",
	Component: MultiSelectField,
	props: {
		startsEmpty: true,
		options: [
			"liver",
			"kidneys",
			"lung",
			"heart",
			"brains",
			"blood",
			"muscle_tissue",
			"lymph_nodes",
			"bone",
			"intestine",
			"skin"
		]
		// allowOther: true
	},
	default: "",
	value: "",
	isHardFilter: true,
	isMatch: isMultiSelectMatch,
	dependencies: [
		{
			id: "type",
			validate: value => value == "vital_tissue" || value == "conserved_tissue"
		}
	],
	synonyms: ["organ"]
};

export const organsRequestField: FormField = {
	...organsField,
	required: false
};
