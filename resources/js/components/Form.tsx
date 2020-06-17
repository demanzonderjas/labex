import { observer } from "mobx-react";
import React from "react";
import { useFormStore } from "../hooks/useFormStore";
import { fieldMeetsDependencies, fieldIsNotHidden } from "../utils/filters/fields";
import { FormFieldWithLabel } from "./FormField";
import { SubmitButton, MatchableButton } from "./base/Button";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { Loader } from "./base/Loader";
import { ErrorNotification } from "./base/ErrorNotification";
import cx from "classnames";
import { TotalMatchesFound } from "./form/TotalMatchesFound";
import { ActiveFilters } from "./form/ActiveFilters";

type Props = {
	header: string;
	submitLabel?: string;
	matchable: boolean;
	intro: string;
};

export const Form: React.FC<Props> = observer(
	({ header, intro, submitLabel = "submit", matchable }) => {
		const {
			fields,
			activeFields,
			submit,
			errors,
			isLoading,
			serverError,
			isCollapsed
		} = useFormStore();
		const { t } = useTranslationStore();
		return (
			<div className={cx("Form", { collapsed: isCollapsed })}>
				<div className="header">
					<div className="layout-wrapper">
						<h1>{t(header)}</h1>
						{intro && <p>{t(intro)}</p>}
						{matchable && <TotalMatchesFound />}
					</div>
				</div>
				<div className="layout-wrapper">
					{matchable && <ActiveFilters />}
					<form onSubmit={submit}>
						<div className="fields">
							{activeFields
								.filter(fieldIsNotHidden)
								.filter((field, index) =>
									fieldMeetsDependencies(field, index, fields)
								)
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
			</div>
		);
	}
);
