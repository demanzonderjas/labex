import { SelectField } from "../../../components/form/SelectField";
import { FormField } from "../../../typings/Form";

export const animalSpeciesField: FormField = {
	label: "animal_species",
	id: "animal_species",
	Component: SelectField,
	required: true,
	props: {
		options: [
			{ label: "mouse", value: "mouse" },
			{ label: "dog", value: "dog" },
			{ label: "cat", value: "cat" }
		],
		allowOther: true
	},
	value: "mouse"
};
