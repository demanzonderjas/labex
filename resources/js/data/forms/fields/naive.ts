import { TFormField } from "../../../typings/Form";
import { BooleanField } from "../../../components/form/BooleanField";

export const naiveField: TFormField = {
	label: "naive",
	id: "naive",
	Component: BooleanField,
	required: true,
	props: {},
	default: "",
	value: "",
	dependencies: [{ id: "type", validate: value => value == "animal" }],
	synonyms: ["naive_animal"]
};
