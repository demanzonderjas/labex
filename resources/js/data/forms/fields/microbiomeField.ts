import { FormField } from "../../../typings/Form";
import { BigTextField } from "../../../components/form/BigTextField";

export const microbiomeField: FormField = {
	label: "microbiome",
	id: "microbiome",
	Component: BigTextField,
	props: {},
	value: ""
};
