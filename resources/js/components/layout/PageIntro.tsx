import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type Props = {
	header: string;
};

export const PageIntro: React.FC<Props> = ({ header, children }) => {
	const { t } = useTranslationStore();
	return (
		<div className="PageIntro">
			<div className="layout-wrapper">
				<h1>{t(header)}</h1>
				{children}
			</div>
		</div>
	);
};
