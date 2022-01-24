import { TFormField } from "../../../typings/forms";
import { BooleanField } from "../../../components/form/BooleanField";
import { TSpecificationName } from "../../../typings/exchanges";

export const naiveField: TFormField = {
	label: "naive",
	id: TSpecificationName.Naive,
	Component: BooleanField,
	required: true,
	props: {},
	default: "",
	description: "naive_animal_description",
	value: "",
	dependencies: [{ id: "type", validate: value => value == "animal" }],
	synonyms: ["naive_animal"]
};
