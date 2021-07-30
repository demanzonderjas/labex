import { BooleanField } from "../../../../components/form/BooleanField";
import { TFormField } from "../../../../typings/Form";

export const showField: TFormField = {
	label: "show",
	id: "show",
	Component: BooleanField,
	required: true,
	props: {},
	default: "",
	value: ""
};
