import { FormField } from "../../../typings/Form";
import { MultiSelectField } from "../../../components/form/MultiSelectField";

export const organsField: FormField = {
	label: "organs",
	id: "organs",
	Component: MultiSelectField,
	props: {
		startsEmpty: true,
		options: [
			{ label: "heart", value: "heart" },
			{ label: "skin", value: "skin" },
			{ label: "liver", value: "liver" },
			{ label: "spleen", value: "spleen" }
		],
		allowOther: true
	},
	value: ""
};
