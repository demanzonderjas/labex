import { FormField } from "../../../typings/Form";
import { MultiSelectField } from "../../../components/form/MultiSelectField";
import { SelectField } from "../../../components/form/SelectField";

export const organsField: FormField = {
	label: "organs",
	id: "organs",
	Component: SelectField,
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
			"lynf_knots",
			"bone",
			"intestine",
			"skin"
		],
		allowOther: true
	},
	default: "",
	value: ""
};

export const organsRequestField: FormField = {
	...organsField,
	required: true
};
