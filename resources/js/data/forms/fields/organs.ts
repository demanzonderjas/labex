import { TFormField } from "../../../typings/forms";
import { MultiSelectField } from "../../../components/form/MultiSelectField";
import { isMultiSelectMatch } from "../../../utils/filters/multiselect";
import { TTypeSpec } from "../../../typings/specifications";
import { TSpecificationName } from "../../../typings/exchanges";

export const organsField: TFormField = {
	label: "organs",
	id: TSpecificationName.Organs,
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
			"skin",
		],
		// allowOther: true
	},
	default: "",
	value: "",
	isHardFilter: true,
	required: true,
	isMatch: isMultiSelectMatch,
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value !== TTypeSpec.Equipment,
		},
	],
	synonyms: ["organ"],
};

export const organsRequestField: TFormField = {
	...organsField,
	required: false,
};
