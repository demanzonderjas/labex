import { FormField, InputType } from "../../../typings/Form";
import { InputField } from "../../../components/form/InputField";

export const tribeField: FormField = {
	label: "tribe",
	id: "tribe",
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text
	},
	default: "",
	value: ""
};
