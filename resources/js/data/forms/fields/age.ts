import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";
import { TTypeSpec } from "../../../typings/specifications";

export const ageField: TFormField = {
	Component: InputField,
	id: TSpecificationName.OperationalAge,
	default: "",
	value: "",
	label: "operational_age",
	props: {
		type: "text",
	},
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value == TTypeSpec.Equipment,
		},
	],
};
