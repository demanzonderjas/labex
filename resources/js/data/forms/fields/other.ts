import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField, InputType } from "../../../typings/Form";

export const otherField: TFormField = {
	label: "other",
	id: TSpecificationName.Other,
	Component: InputField,
	props: {
		type: InputType.Text
	},
	default: "",
	value: "",
	hidden: true
};
