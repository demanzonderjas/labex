import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";
import { TTypeSpec } from "../../../typings/specifications";

export const deviceTypeField: TFormField = {
	label: "device_type",
	id: TSpecificationName.DeviceType,
	Component: SelectField,
	isHardFilter: true,
	props: {
		startsEmpty: true,
		options: [
			"incubator",
			"centrifuge",
			"water_bath",
			"oven",
			"mixer_shaker",
			"freezer_refrigerator",
			"microscope",
			"elisa_reader",
		],
		allowOther: true,
	},
	default: "",
	value: "",
	dependencies: [
		{
			id: TSpecificationName.ExchangeType,
			validate: (value) => value === TTypeSpec.Equipment,
		},
	],
};

export const typeField: TFormField = {
	label: "type",
	id: TSpecificationName.ExchangeType,
	Component: SelectField,
	isHardFilter: true,
	props: {
		startsEmpty: true,
		options: [
			TTypeSpec.Equipment,
			TTypeSpec.Chemicals,
			TTypeSpec.Disposables,
			TTypeSpec.Furniture,
		],
	},
	default: "",
	value: "",
	synonyms: ["type_of", "type_offer", "type_of_material"],
};
