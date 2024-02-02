import { InputField } from "../../../components/form/InputField";
import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { InputType, TFormField } from "../../../typings/forms";
import { TTypeSpec } from "../../../typings/specifications";

export const packagingMethodField: TFormField = {
	label: "packaging_method",
	id: TSpecificationName.PackagingMethod,
	required: true,
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

export const disposablePackagingField: TFormField = {
	label: "packaging_method",
	id: TSpecificationName.PackagingMethod,
	Component: SelectField,
	props: {
		startsEmpty: true,
		options: ["non_packaged", "sterile", "net_sterile"],
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value == TTypeSpec.Disposables,
		},
	],
	synonyms: ["storage_method"],
};
