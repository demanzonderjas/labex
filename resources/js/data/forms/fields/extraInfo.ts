import { TFormField } from "../../../typings/forms";
import { BigTextField } from "../../../components/form/BigTextField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TTypeSpec } from "../../../typings/specifications";

export const extraInfoField: TFormField = {
	label: "extra_info",
	id: TSpecificationName.ExtraInfo,
	Component: BigTextField,
	ignoreInMatch: true,
	props: {},
	default: "",
	value: "",
	synonyms: ["info", "extra", "information", "extra_information"],
};

export const contactDetailsField: TFormField = {
	...extraInfoField,
	label: "contact_details",
	description: "contact_details_info",
	id: TSpecificationName.ContactDetails,
};
