import { FormField } from "../../../typings/Form";
import { IconSelectField } from "../../../components/form/IconSelectField";

const genderOptions = [
	{ icon: "male", value: "male" },
	{ icon: "female", value: "female" }
];

export const genderField: FormField = {
	label: "gender",
	id: "gender",
	Component: IconSelectField,
	required: true,
	props: {
		options: genderOptions
	},
	value: ""
};

export const genderRequestField: FormField = {
	...genderField,
	props: {
		options: [...genderOptions, { label: "x", value: "irrelevant" }]
	}
};
