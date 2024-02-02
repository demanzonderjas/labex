import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField, InputType } from "../../../typings/forms";
import { TTypeSpec } from "../../../typings/specifications";

export const sampleNumberField: TFormField = {
	label: "sample_number",
	id: TSpecificationName.SampleNumber,
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text,
	},
	default: "",
	value: "",
	synonyms: ["samplenumber", "number"],
};

export const sampleNumberRequestField: TFormField = {
	...sampleNumberField,
	required: false,
};

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
