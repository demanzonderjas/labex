import { TFormField } from "../../../typings/Form";
import { BigTextField } from "../../../components/form/BigTextField";

export const extraInfoField: TFormField = {
	label: "extra_info",
	id: "extra_info",
	Component: BigTextField,
	ignoreInMatch: true,
	props: {},
	default: "",
	value: "",
	synonyms: ["info", "extra", "information", "extra_information"]
};
