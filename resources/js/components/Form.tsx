import { observer } from "mobx-react";
import React, { useState } from "react";
import { useFormStore } from "../hooks/useFormStore";
import { fieldMeetsDependencies, fieldIsNotHidden } from "../utils/filters/fields";
import { FormFieldWithLabel } from "./FormField";
import { SubmitButton, MatchableButton } from "./base/Button";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { Loader } from "./base/Loader";
import { ErrorNotification } from "./base/ErrorNotification";
import cx from "classnames";
import { LocalImage } from "./base/Image";
import { TotalMatchesFound } from "./form/TotalMatchesFound";
import { ActiveFilters } from "./form/ActiveFilters";

type Props = {
	header: string;
	submitLabel?: string;
	matchable: boolean;
};

export const Form: React.FC<Props> = observer(({ header, submitLabel = "submit", matchable }) => {
	const { fields, submit, errors, isLoading, serverError, isCollapsed } = useFormStore();
	const { t } = useTranslationStore();
	return (
		<div className={cx("Form", { collapsed: isCollapsed })}>
			<h1>
				{t(header)}
				<LocalImage path="icons/arrow-down-white.svg" />
			</h1>
			{matchable && <TotalMatchesFound />}
			{matchable && <ActiveFilters />}
			<form onSubmit={submit}>
				<div className="fields">
					{fields
						.filter(fieldIsNotHidden)
						.filter(fieldMeetsDependencies)
						.map(field => (
							<FormFieldWithLabel
								key={field.id}
								field={field}
								error={errors[field.id]}
							/>
						))}
				</div>
				{matchable && <MatchableButton label={submitLabel} />}
				{!matchable && <SubmitButton label={submitLabel} />}
				<Loader isLoading={isLoading} />
				<ErrorNotification error={serverError} />
			</form>
		</div>
	);
});
