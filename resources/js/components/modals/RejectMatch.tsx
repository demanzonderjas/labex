import React, { useState } from "react";
import { useModalStore } from "../../hooks/useModalStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { rejectMatch } from "../../queries/admin/approveMatch";
import { BlankButton, Button } from "../base/Button";

export function RejectMatchModal() {
	const { t } = useTranslationStore();
	const [message, setMessage] = useState("");
	const { cancel, modal, confirm } = useModalStore();

	const reject = async () => {
		await rejectMatch(modal.props.matchId, message);
		confirm();
		location.reload();
	};

	return (
		<>
			<div className="BigTextField">
				<textarea
					value={message}
					onChange={e => setMessage(e.target.value)}
					placeholder={t("why_reject_message")}
				/>
			</div>
			<div className="buttons layout-wrapper">
				<BlankButton label="cancel" handleClick={cancel} classes={{ inline: true }} />
				<Button
					label="send"
					handleClick={reject}
					classes={{ inline: true, secondary: true }}
				/>
			</div>
		</>
	);
}
