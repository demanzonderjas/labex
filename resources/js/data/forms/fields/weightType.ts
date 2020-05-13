import { FormField } from "../../../typings/Form";
import { IconSelectField } from "../../../components/form/IconSelectField";

export const weightTypeField: FormField = {
	label: "weight_type",
	id: "weight_type",
	Component: IconSelectField,
	props: {
		options: [
			{ text: "Kg", value: "kg" },
			{ text: "g", value: "g" }
		]
	},
	value: ""
};
