import React, { useState } from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { useModalStore } from "../../hooks/useModalStore";
import { FormWrapper } from "../FormWrapper";
import { Icon } from "./Image";
import cx from "classnames";
import { BlankButton } from "./Button";

export function Modal() {
	const { t } = useTranslationStore();
	const { modal, cancel, confirm } = useModalStore();

	return (
		<div className={`modal layout-wrapper ${modal.align ? modal.align : ""}`}>
			<div className="header">
				<h2>{t(modal.header)}</h2>
			</div>
			<div className={cx("body", { "with-form": !!modal.form })}>
				<p>{t(modal.description)}</p>
				{modal.form && <FormWrapper form={modal.form} handleSuccess={confirm} />}
				{modal.Component && <modal.Component {...modal.props} />}
				{modal.form && (
					<div className="buttons layout-wrapper">
						<BlankButton
							label="cancel"
							handleClick={cancel}
							classes={{ inline: true }}
						/>
					</div>
				)}
			</div>
			<div className="close" onClick={cancel}>
				<Icon name="cross" />
			</div>
		</div>
	);
}
