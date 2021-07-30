import { CategorySelectField } from "../../../../components/form/custom-fields/CategorySelectField";
import { TFormField } from "../../../../typings/Form";

export const categoryField: TFormField = {
	label: "category",
	id: "category",
	required: true,
	Component: CategorySelectField,
	props: {},
	default: "",
	value: ""
};
