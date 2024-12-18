import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export function SystemMessage({ message }) {
	const { t } = useTranslationStore();
	return (
		<div className="system-message">
			<p>{t(message)}</p>
		</div>
	);
}
