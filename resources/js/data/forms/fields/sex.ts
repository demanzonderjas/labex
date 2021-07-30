import { TFormField } from "../../../typings/Form";
import { IconSelectField } from "../../../components/form/IconSelectField";

const sexOptions = [
	{ icon: "male", value: "male" },
	{ icon: "female", value: "female" }
];

export const sexField: TFormField = {
	label: "sex",
	id: "sex",
	Component: IconSelectField,
	props: {
		options: sexOptions
	},
	isHardFilter: true,
	default: "",
	value: "",
	synonyms: ["sekse", "gender"]
};

export const sexRequestField: TFormField = {
	...sexField,
	required: false
};
