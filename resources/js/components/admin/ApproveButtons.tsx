import React from "react";
import { ConfirmButton, DangerButton } from "../base/Button";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { useModalStore } from "../../hooks/useModalStore";
import { approveMatchModal, rejectMatchModal } from "../../data/modals/matches";

type Props = {
	matchId: number;
};

export const ApproveButtons: React.FC<Props> = observer(({ matchId }) => {
	const { t } = useTranslationStore();
	const { setModal } = useModalStore();

	return (
		<div className="ApproveButtons">
			<h3>{t("approve_match")}</h3>
			<ConfirmButton
				label="yes"
				handleClick={() => setModal({ ...approveMatchModal, props: { matchId } })}
				classes={{ inline: true }}
			/>
			<DangerButton
				label="no"
				handleClick={() => setModal({ ...rejectMatchModal, props: { matchId } })}
				classes={{ inline: true }}
			/>
		</div>
	);
});
