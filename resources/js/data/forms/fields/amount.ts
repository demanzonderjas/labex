import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";
import { InputType, TFormField } from "../../../typings/forms";
import { TTypeSpec } from "../../../typings/specifications";

export const volumeWeightField: TFormField = {
	label: "volume_weight",
	id: TSpecificationName.VolumeWeight,
	Component: InputField,
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

export const amountField: TFormField = {
	label: "amount",
	id: TSpecificationName.Amount,
	Component: InputField,
	props: {
		type: InputType.Text,
	},
	default: "",
	value: "",
	ignoreInMatch: true,
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value === TTypeSpec.Disposables || value === TTypeSpec.Equipment,
		},
	],
};
