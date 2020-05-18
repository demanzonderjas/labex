import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Link } from "react-router-dom";

type Props = {
	label: string;
	isActive: boolean;
};

export const MenuItem: React.FC<Props> = observer(({ label, isActive }) => {
	const { t } = useTranslationStore();
	return (
		<Link to={label}>
			<li>{t(label)}</li>
		</Link>
	);
});
