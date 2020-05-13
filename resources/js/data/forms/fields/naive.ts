import { FormField } from "../../../typings/Form";
import { BooleanField } from "../../../components/form/BooleanField";

export const naiveField: FormField = {
	label: "naive",
	id: "naive",
	Component: BooleanField,
	required: true,
	props: {},
	value: ""
};
