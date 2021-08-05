import { TFormField } from "../../../typings/forms";
import { BigTextField } from "../../../components/form/BigTextField";
import { TSpecificationName } from "../../../typings/exchanges";

export const extraInfoField: TFormField = {
	label: "extra_info",
	id: TSpecificationName.ExtraInfo,
	Component: BigTextField,
	ignoreInMatch: true,
	props: {},
	default: "",
	value: "",
	synonyms: ["info", "extra", "information", "extra_information"]
};
