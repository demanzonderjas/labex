import { BigTextField } from "../../../components/form/BigTextField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";

export const safetyAspectsField: TFormField = {
	label: "safety_aspects",
	id: TSpecificationName.SafetyAspects,
	Component: BigTextField,
	ignoreInMatch: true,
	props: {},
	default: "",
	value: "",
};
