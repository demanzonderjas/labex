import { FormField } from "../../../typings/Form";
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
	value: "",
	dependencies: [
		{
			id: "type",
			validate: value => value == "vital_tissue" || value == "conserved_tissue"
		}
	]
};

export const organsRequestField: FormField = {
	...organsField,
	required: false
};
