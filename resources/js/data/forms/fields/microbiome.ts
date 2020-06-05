import { FormField } from "../../../typings/Form";
import { BooleanField } from "../../../components/form/BooleanField";

export const microbiomeField: FormField = {
	label: "microbiome",
	id: "microbiome",
	Component: BooleanField,
	props: {},
	default: "",
	value: ""
};
