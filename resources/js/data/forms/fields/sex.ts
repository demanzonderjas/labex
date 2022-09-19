import { TFormField } from "../../../typings/forms";
import { IconSelectField } from "../../../components/form/IconSelectField";
import { TSpecificationName } from "../../../typings/exchanges";

const sexOptions = [
	{ icon: "male", value: "male" },
	{ icon: "female", value: "female" }
];

export const sexField: TFormField = {
	label: "sex",
	id: TSpecificationName.Sex,
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
