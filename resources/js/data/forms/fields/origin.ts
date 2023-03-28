import { InputField } from "../../../components/form/InputField";
import { SelectField } from "../../../components/form/SelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { InputType, TFormField } from "../../../typings/forms";
import { TSpecStatus } from "../../../typings/specifications";

export const originField: TFormField = {
	label: "origin",
	id: TSpecificationName.Origin,
	Component: SelectField,
	props: {
		options: ["experiment", "breeding"],
		startsEmpty: true,
		allowOther: true
	},
	default: "",
	value: "",
	synonyms: ["herkomst"]
};

export const originIdField: TFormField = {
	label: "origin_id",
	id: TSpecificationName.OriginId,
	Component: InputField,
	isHardFilter: true,
	isMatch: (givenValue: string, _, __, ___, data) => {
		return +givenValue === data.origin_id || +givenValue === data.id
			? TSpecStatus.Match
			: TSpecStatus.NoMatch;
	},
	props: {
		type: InputType.Text
	},
	default: "",
	value: ""
};
