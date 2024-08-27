import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";

export const ageField: TFormField = {
	Component: InputField,
	id: TSpecificationName.OperationalAge,
	default: "",
	value: "",
	label: "operational_age",
	props: {
		type: "text",
	},
};
