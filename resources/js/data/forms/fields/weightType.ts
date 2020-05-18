import { FormField } from "../../../typings/Form";
import { IconSelectField } from "../../../components/form/IconSelectField";

export const weightTypeField: FormField = {
	label: "weight_type",
	id: "weight_type",
	Component: IconSelectField,
	props: {
		options: [
			{ label: "Kg", value: "kg" },
			{ label: "g", value: "g" }
		]
	},
	value: ""
};
