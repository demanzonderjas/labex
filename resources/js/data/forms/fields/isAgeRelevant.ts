import { FormField } from "../../../typings/Form";
import { BooleanField } from "../../../components/form/BooleanField";

export const isAgeRelevantField: FormField = {
	label: "is_age_relevant",
	id: "is_age_relevant",
	Component: BooleanField,
	required: true,
	props: {},
	value: ""
};
