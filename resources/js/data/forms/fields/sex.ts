import { TFormField } from "../../../typings/forms";
import { IconSelectField } from "../../../components/form/IconSelectField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TSpecStatus } from "../../../typings/specifications";

const sexOptions = [
	{ icon: "male", value: "male" },
	{ icon: "female", value: "female" },
	{ icon: "", label: "both", value: "both" }
];

export const sexField: TFormField = {
	label: "sex",
	id: TSpecificationName.Sex,
	Component: IconSelectField,
	props: {
		options: sexOptions
	},
	isMatch: (givenValue, targetValue) => {
		if (targetValue === "both" || givenValue === "both") {
			return TSpecStatus.Match;
		}
		return givenValue === targetValue ? TSpecStatus.Match : TSpecStatus.NoMatch;
	},
	isHardFilter: true,
	default: "",
	value: "",
	synonyms: ["sekse", "gender"]
};

export const sexRequestField: TFormField = {
	...sexField,
	required: false
};
