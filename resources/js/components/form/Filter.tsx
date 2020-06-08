import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type Props = {
	value: string;
};

export const Filter: React.FC<Props> = ({ value }) => {
	const { t } = useTranslationStore();
	return (
		<div className="Filter">
			<span>{t(value)}</span>
		</div>
	);
};
