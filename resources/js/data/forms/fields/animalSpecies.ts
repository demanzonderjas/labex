import { SelectField } from "../../../components/form/SelectField";
import { FormField } from "../../../typings/Form";

export const animalSpeciesField: FormField = {
	label: "animal_species",
	id: "animal_species",
	Component: SelectField,
	required: true,
	props: {
		options: [
			"mouse",
			"rat",
			"guinea_pig",
			"hamster",
			"rabbit",
			"dog",
			"cat",
			"ferret",
			"pig",
			"sheep",
			"goat",
			"horse",
			"bovine",
			"chicken",
			"zebra_finch",
			"zebrafish"
		],
		allowOther: true
	},
	value: "mouse"
};
