import { observer } from "mobx-react";
import React from "react";
import { useFormStore } from "../hooks/useFormStore";
import { Button, DangerButton, SubmitButton } from "./base/Button";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { Loader } from "./base/Loader";
import { ErrorNotification } from "./base/ErrorNotification";
import cx from "classnames";
import { ActiveFilters } from "./form/ActiveFilters";
import { TwoColumnPageIntro } from "./layout/PageIntro";
import { Icon } from "./base/Image";
import { useModalStore } from "../hooks/useModalStore";
import { TModal } from "../typings/modals";
import { useHistory } from "react-router";
import { RegularFormLayout } from "./form/layouts/RegularLayout";
import { RequiredFormLayout } from "./form/layouts/RequiredLayout";

type Props = {
	header: string;
	submitLabel?: string;
	hideSubmit?: boolean;
	allowCancel?: boolean;
	matchable: boolean;
	intro: string;
	fullWidthFields?: boolean;
	infoModal?: TModal;
};

export const Form: React.FC<Props> = observer(
	({
		header,
		intro,
		submitLabel = "submit",
		matchable,
		hideSubmit,
		allowCancel,
		fullWidthFields,
		infoModal
	}) => {
		const { submit, isLoading, serverError, isCollapsed, resetForm, form } = useFormStore();
		const { t } = useTranslationStore();
		const { setModal } = useModalStore();
		const history = useHistory();

		return (
			<div
				className={cx("Form", {
					collapsed: isCollapsed,
					"full-width-fields": !!fullWidthFields
				})}
			>
				{header && (
					<TwoColumnPageIntro header={header} subheader="" matchable={matchable}>
						<p className="layout-wrapper">{t(intro)}</p>
						{infoModal && (
							<Button
								label={infoModal.header}
								handleClick={() => setModal(infoModal)}
								classes={{ inline: true }}
							/>
						)}
					</TwoColumnPageIntro>
				)}
				<div className="layout-wrapper">
					{matchable && <ActiveFilters />}
					{matchable && (
						<div className="reset-button" onClick={resetForm}>
							<span>{t("reset")}</span>
							<Icon name="reload" />
						</div>
					)}
					<form onSubmit={submit}>
						<span className="legend">
							<span className="required">*</span>
							{t("required_otherwise_optional")}
						</span>
						{form.splitByRequired ? <RequiredFormLayout /> : <RegularFormLayout />}
						{!hideSubmit && (
							<div
								className="button-wrapper"
								style={{ display: "flex", justifyContent: "space-between" }}
							>
								<SubmitButton label={submitLabel} />
								{allowCancel && (
									<DangerButton
										label="cancel"
										handleClick={() => history.goBack()}
									/>
								)}
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
