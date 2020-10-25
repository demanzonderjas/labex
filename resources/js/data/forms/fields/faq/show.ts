import { BooleanField } from "../../../../components/form/BooleanField";
import { FormField } from "../../../../typings/Form";

export const showField: FormField = {
	label: "show",
	id: "show",
	Component: BooleanField,
	required: true,
	props: {},
	default: "",
	value: ""
};