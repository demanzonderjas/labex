import { FormField } from "../../../typings/Form";
import { IconSelectField } from "../../../components/form/IconSelectField";

export const genderField: FormField = {
	label: "gender",
	id: "gender",
	Component: IconSelectField,
	props: {
		options: [
			{ icon: "male", value: "male" },
			{ icon: "female", value: "female" }
		]
	},
	value: ""
};
