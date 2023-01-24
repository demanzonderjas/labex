import { InputField } from "../../../../components/form/InputField";
import { SelectField } from "../../../../components/form/SelectField";
import { InputType, TFormField, TFormFieldName } from "../../../../typings/forms";

export const organisationField: TFormField = {
	label: "organisation",
	id: TFormFieldName.Organisation,
	required: true,
	Component: InputField,
	props: {
		type: InputType.Text
	},
	default: "",
	value: ""
};

export const organisationSelectField: TFormField = {
	label: "organisation",
	id: TFormFieldName.Organisation,
	required: true,
	Component: SelectField,
	props: {
		options: ["universiteit-utrecht", "umcutrecht.nl", "radboudumc", "radboud-universiteit"],
		startsEmpty: true,
		allowOther: true
	},
	default: "",
	value: ""
};
