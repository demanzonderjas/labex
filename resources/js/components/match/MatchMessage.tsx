import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { TMatch } from "../../typings/exchanges";

export const MatchMessage: React.FC<{ match: TMatch }> = ({ match }) => {
	const { t } = useTranslationStore();

	if (!match.admin_actions.length) {
		return null;
	}

	return (
		<div className="messages">
			{match.admin_actions.map((m, idx) => (
				<div className="message" key={idx}>
					<p>{m.message}</p>
					<span className="action">{t(m.action)}</span>
					{m.admin && (
						<span className="admin">
							{m.admin.name} - {m.admin.email} - {t(m.admin.organisation)}
						</span>
					)}
				</div>
			))}
		</div>
	);
};
