import { InputField } from "../../../../components/form/InputField";
import { TExchangeAttempt } from "../../../../typings/exchanges";
import { InputType, TFormField, TFormFieldName } from "../../../../typings/forms";
import { TSpecStatus } from "../../../../typings/specifications";

export const userFilterField: TFormField = {
	label: "user",
	id: TFormFieldName.User,
	Component: InputField,
	isMatch: (text: string, _, __, ___, attempt: TExchangeAttempt) => {
		if (!attempt.user) {
			return TSpecStatus.NoMatch;
		}

		if (`${attempt.user.name} ${attempt.user.email}`.toLowerCase().match(text.toLowerCase())) {
			return TSpecStatus.Match;
		}

		return TSpecStatus.NoMatch;
	},
	isHardFilter: true,
	props: {
		type: InputType.Text
	},
	default: "",
	value: ""
};
