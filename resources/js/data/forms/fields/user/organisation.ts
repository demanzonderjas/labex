import { InputField } from "../../../../components/form/InputField";
import { SelectField } from "../../../../components/form/SelectField";
import { InputType, TFormField, TFormFieldName } from "../../../../typings/forms";
import { TSpecStatus } from "../../../../typings/specifications";

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
		options: ["uu.nl", "umcutrecht.nl", "radboudumc.nl", "ru.nl"],
		startsEmpty: true,
		allowOther: true
	},
	default: "",
	value: ""
};

export const organisationFilterField: TFormField = {
	...organisationSelectField,
	required: false,
	isHardFilter: true,
	isMatch: (givenValue, _, __, ___, data) => {
		const isPartOfOrganisation = !!data.user && data.user.organisation === givenValue;
		const isSynonym = givenValue === "radboudumc.nl" && !!data.user && data.user.organisation === "umcn.nl";

		return isPartOfOrganisation || isSynonym ? TSpecStatus.Match : TSpecStatus.NoMatch;
	},
	props: {
		...organisationSelectField.props,
		allowOther: false
	}
};
