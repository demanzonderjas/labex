import { BooleanField } from "../../../components/form/BooleanField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";

export const adoptionField: TFormField = {
	label: "suitable_for_adoption",
	id: TSpecificationName.SuitableForAdoption,
	Component: BooleanField,
	required: true,
	isHardFilter: true,
	description: "suitable_for_adoption_description",
	props: {},
	default: "",
	value: ""
};

export const adoptionFilterField: TFormField = {
	...adoptionField,
	required: false
};
