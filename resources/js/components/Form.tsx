import { observer } from "mobx-react";
import React from "react";
import { useFormStore } from "../hooks/useFormStore";
import { fieldMeetsDependencies, fieldIsNotHidden } from "../utils/filters/fields";
import { FormFieldWithLabel } from "./FormField";
import { SubmitButton } from "./base/Button";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { Loader } from "./base/Loader";
import { ErrorNotification } from "./base/ErrorNotification";

type Props = {
	header: string;
};

export const Form: React.FC<Props> = observer(({ header }) => {
	const { fields, submit, errors, isLoading, serverError } = useFormStore();
	const { t } = useTranslationStore();
	return (
		<div className="Form">
			<h2>{t(header)}</h2>
			<form onSubmit={submit}>
				{fields
					.filter(fieldIsNotHidden)
					.filter(fieldMeetsDependencies)
					.map(field => (
						<FormFieldWithLabel key={field.id} field={field} error={errors[field.id]} />
					))}
				<SubmitButton label="submit" />
				<Loader isLoading={isLoading} />
				<ErrorNotification error={serverError} />
			</form>
		</div>
	);
});
