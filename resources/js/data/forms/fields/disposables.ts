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
		options: [
			"containers",
			"pipettes",
			"pipette_tips",
			"petri_dishes",
			"tubes",
			"gloves",
			"syringes",
		],
		allowOther: true,
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
