import { BooleanField } from "../../../components/form/BooleanField";
import { TSpecificationName } from "../../../typings/exchanges";
import { TFormField } from "../../../typings/forms";

export const isActiveField: TFormField = {
	label: "is_active",
	id: TSpecificationName.Status,
	Component: BooleanField,
	required: true,
	transform: (value: any) => {
		if (value === "active") {
			return "yes";
		} else if (value === "inactive") {
			return "no";
		} else {
			return value;
		}
	},
	props: {},
	default: "",
	value: "",
};
