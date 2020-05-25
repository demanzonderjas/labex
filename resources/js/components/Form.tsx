import { observer } from "mobx-react";
import React, { useState } from "react";
import { useFormStore } from "../hooks/useFormStore";
import { fieldMeetsDependencies, fieldIsNotHidden } from "../utils/filters/fields";
import { FormFieldWithLabel } from "./FormField";
import { SubmitButton } from "./base/Button";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { Loader } from "./base/Loader";
import { ErrorNotification } from "./base/ErrorNotification";
import cx from "classnames";
import { LocalImage } from "./base/Image";

type Props = {
	header: string;
};

export const Form: React.FC<Props> = observer(({ header }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const { fields, submit, errors, isLoading, serverError } = useFormStore();
	const { t } = useTranslationStore();
	return (
		<div className={cx("Form", { collapsed: isCollapsed })}>
			<h2 onClick={() => setIsCollapsed(!isCollapsed)}>
				{t(header)}
				<LocalImage path="icons/arrow-down-white.svg" />
			</h2>
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
