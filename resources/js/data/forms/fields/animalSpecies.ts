import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/Form";

export const animalSpeciesField: TFormField = {
	label: "animal_species",
	id: TSpecificationName.AnimalSpecies,
	Component: SelectField,
	props: {
		startsEmpty: true,
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
			"cattle",
			"chicken",
			"zebra_finch",
			"zebrafish"
		],
		allowOther: true,
		synonyms: ["species", "animal_type", "type_of_animal"]
	},
	isHardFilter: true,
	default: "",
	value: ""
};
