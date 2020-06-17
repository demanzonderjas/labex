import { FormField } from "../../../typings/Form";
import { IconSelectField } from "../../../components/form/IconSelectField";

const sexOptions = [
	{ icon: "male", value: "male" },
	{ icon: "female", value: "female" }
];

export const sexField: FormField = {
	label: "sex",
	id: "sex",
	Component: IconSelectField,
	props: {
		options: sexOptions
	},
	default: "",
	value: ""
};

export const sexRequestField: FormField = {
	...sexField,
	required: false
};
