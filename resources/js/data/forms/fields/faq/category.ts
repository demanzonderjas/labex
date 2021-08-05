import { CategorySelectField } from "../../../../components/form/custom-fields/CategorySelectField";
import { TFormField, TFormFieldName } from "../../../../typings/Form";

export const categoryField: TFormField = {
	label: "category",
	id: TFormFieldName.Category,
	required: true,
	Component: CategorySelectField,
	props: {},
	default: "",
	value: ""
};
