import React, { useState } from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { useModalStore } from "../../hooks/useModalStore";
import { BlankButton, ConfirmButton, SubmitButton, Button } from "./Button";
import { FormStore } from "../../stores/FormStore";
import { FormWrapper } from "../FormWrapper";
import { LocalImage, Icon } from "./Image";

export function Modal() {
	const { t } = useTranslationStore();
	const { modal, cancel, confirm } = useModalStore();

	return (
		<div className="modal">
			{!modal.form && (
				<div className="header">
					<h2>{t(modal.header)}</h2>
				</div>
			)}
			<div className="body">
				{!modal.form && <p>{t(modal.description)}</p>}
				{modal.form && <FormWrapper form={modal.form} />}
				<div className="buttons layout-wrapper">
					<BlankButton label="cancel" handleClick={cancel} classes={{ inline: true }} />
					<Button
						label="confirm"
						handleClick={confirm}
						classes={{ inline: true, primary: true }}
					/>
				</div>
			</div>
			<div className="close" onClick={cancel}>
				<Icon name="cross" />
			</div>
		</div>
	);
}
