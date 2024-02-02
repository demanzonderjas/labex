import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";
import { TTypeSpec } from "../../../typings/specifications";
import { extraInfoField } from "./extraInfo";

export const disposableCategoryField: TFormField = {
	label: "disposable_category",
	id: TSpecificationName.DisposableCategory,
	Component: SelectField,
	isHardFilter: true,
	props: {
		startsEmpty: true,
		options: ["A", "B", "C", "D"],
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

export const disposableDetailsField: TFormField = {
	...extraInfoField,
	label: "disposable_details",
	description: "disposable_details_description",
	id: TSpecificationName.DisposableDetails,
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value === TTypeSpec.Disposables,
		},
	],
};
