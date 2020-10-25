import { CategorySelectField } from "../../../../components/form/custom-fields/CategorySelectField";
import { FormField } from "../../../../typings/Form";

export const categoryField: FormField = {
	label: "category",
    id: "category",
    required: true,
    Component: CategorySelectField,
    props: {},
	default: "",
	value: "",
};
