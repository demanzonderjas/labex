import { TFormField } from "../../../typings/forms";
import { BigTextField } from "../../../components/form/BigTextField";
import { TSpecificationName } from "../../../typings/exchanges";
import { InputField } from "../../../components/form/InputField";

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

export const animalNumbersField: TFormField = {
	label: "animal_numbers",
	id: TSpecificationName.AnimalNumbers,
	Component: InputField,
	ignoreInMatch: true,
	props: {},
	default: "",
	value: "",
	synonyms: ["animal_number"]
};
