import { FormField } from "../../../typings/Form";
import { MultiSelectField } from "../../../components/form/MultiSelectField";

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
