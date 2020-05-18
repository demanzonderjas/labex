import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type Props = {
	label: string;
	isActive: boolean;
};

export const MenuItem: React.FC<Props> = observer(({ label, isActive }) => {
	const { t } = useTranslationStore();
	return <li>{t(label)}</li>;
});
