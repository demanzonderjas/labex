import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TMatch } from "../../typings/exchanges";

export const MatchMessage: React.FC<{ match: TMatch }> = ({ match }) => {
	const { t } = useTranslationStore();

	const hasMessagesWithText =
		match.admin_actions &&
		match.admin_actions.length &&
		match.admin_actions.some(m => !!m.message);

	if (!hasMessagesWithText) {
		return null;
	}

	return (
		<div className="messages">
			{match.admin_actions.map((m, idx) => (
				<div className="message" key={idx}>
					<p>{m.message}</p>
					<span>{t(m.action)}</span>
				</div>
			))}
		</div>
	);
};
