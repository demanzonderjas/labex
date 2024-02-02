import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField, InputType } from "../../../typings/forms";
import { TTypeSpec } from "../../../typings/specifications";

export const productProducerField: TFormField = {
	label: "product_producer_number",
	id: TSpecificationName.ProductProducerNumber,
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text,
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value === TTypeSpec.Chemicals,
		},
	],
};

export const numberField: TFormField = {
	label: "number",
	id: TSpecificationName.Number,
	Component: InputField,
	props: {
		type: InputType.Text,
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value === TTypeSpec.Disposables,
		},
	],
};
