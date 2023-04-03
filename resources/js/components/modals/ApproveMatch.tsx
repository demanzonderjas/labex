import React, { useState } from "react";
import { useModalStore } from "../../hooks/useModalStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { approveMatch } from "../../queries/admin/approveMatch";
import { BlankButton, Button } from "../base/Button";

export function ApproveMatchModal() {
	const { t } = useTranslationStore();
	const [message, setMessage] = useState("");
	const { cancel, modal, confirm } = useModalStore();

	const approve = async () => {
		await approveMatch(modal.props.matchId, message);
		confirm();
		location.reload();
	};

	return (
		<>
			<div className="BigTextField">
				<textarea value={message} onChange={e => setMessage(e.target.value)} />
			</div>
			<div className="buttons layout-wrapper">
				<BlankButton label="cancel" handleClick={cancel} classes={{ inline: true }} />
				<Button
					label="send"
					handleClick={approve}
					classes={{ inline: true, secondary: true }}
				/>
			</div>
		</>
	);
}
