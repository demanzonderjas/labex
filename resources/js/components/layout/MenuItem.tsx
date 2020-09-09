import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Link, NavLink } from "react-router-dom";

type Props = {
	prefix: string;
	label: string;
};

export const MenuItem: React.FC<Props> = observer(({ prefix, label }) => {
	const { t } = useTranslationStore();
	return (
		<NavLink exact to={`/${prefix}/${label}`} activeClassName="active">
			<li>{t(label)}</li>
		</NavLink>
	);
});
