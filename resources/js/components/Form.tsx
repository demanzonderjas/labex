import { observer } from "mobx-react";
import React from "react";
import { useFormStore } from "../hooks/useFormStore";
import { fieldMeetsDependencies, fieldIsNotHidden } from "../utils/filters/fields";
import { FormFieldWithLabel } from "./FormField";
import { SubmitButton } from "./base/Button";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { Loader } from "./base/Loader";
import { ErrorNotification } from "./base/ErrorNotification";
import cx from "classnames";
import { TotalMatchesFound } from "./form/TotalMatchesFound";
import { ActiveFilters } from "./form/ActiveFilters";
import { PageIntro } from "./layout/PageIntro";
import { Icon } from "./base/Image";

type Props = {
	header: string;
	submitLabel?: string;
	hideSubmit?: boolean;
	matchable: boolean;
	intro: string;
	fullWidthFields?: boolean;
};

export const Form: React.FC<Props> = observer(
	({ header, intro, submitLabel = "submit", matchable, hideSubmit, fullWidthFields }) => {
		const {
			fields,
			activeFields,
			submit,
			errors,
			isLoading,
			serverError,
			isCollapsed,
			resetForm,
		} = useFormStore();
		const { t } = useTranslationStore();
		return (
			<div className={cx("Form", { collapsed: isCollapsed, "full-width-fields": !!fullWidthFields })}>
				{header &&<PageIntro header={header}>
					{intro && <p>{t(intro)}</p>}
					{matchable && <TotalMatchesFound />}
				</PageIntro>}
				<div className="layout-wrapper">
					{matchable && <ActiveFilters />}
					{matchable && (
						<div className="reset-button" onClick={resetForm}>
							<span>{t("reset")}</span>
							<Icon name="reload" />
						</div>
					)}
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
						{!hideSubmit && (
							<div className="button-wrapper">
								<SubmitButton label={submitLabel} />
							</div>
						)}
						<Loader isLoading={isLoading} />
						<ErrorNotification error={serverError} />
					</form>
				</div>
			</div>
		);
	}
);
