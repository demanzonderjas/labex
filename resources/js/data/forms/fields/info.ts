import { BigTextField } from "../../../components/form/BigTextField";
import { InputField } from "../../../components/form/InputField";
import { TSpecificationName } from "../../../typings/exchanges";
import { InputType, TFormField } from "../../../typings/forms";

export const titleField: TFormField = {
	label: "title",
	id: TSpecificationName.Title,
	hideAsFilter: true,
	Component: InputField,
	required: true,
	props: {
		type: InputType.Text,
	},
	default: "",
	value: "",
};

export const descriptionField: TFormField = {
	label: "description",
	id: TSpecificationName.Description,
	hideAsFilter: true,
	Component: BigTextField,
	required: true,
	props: {
		type: InputType.Text,
	},
	default: "",
	value: "",
};
