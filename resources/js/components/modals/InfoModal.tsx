import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { useModalStore } from "../../hooks/useModalStore";

export function InfoModal() {
	const { t } = useTranslationStore();
	const { data } = useModalStore();
	const { header, description } = data;
	return (
		<>
			<h3>{t(header)}</h3>
			<p>{t(description)}</p>
		</>
	);
}
