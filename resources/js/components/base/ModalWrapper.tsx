import React, { useState } from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Modal } from "./Modal";
import { useModalStore } from "../../hooks/useModalStore";
import cx from "classnames";
import { observer } from "mobx-react-lite";

export const ModalWrapper: React.FC = observer(() => {
	const { t } = useTranslationStore();
	const { isActive, modal } = useModalStore();

	return (
		<div className={cx("ModalWrapper", { active: isActive })}>
			<div className="bg" />
			{!!modal && <Modal />}
		</div>
	);
});
