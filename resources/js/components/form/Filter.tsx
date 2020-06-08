import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import cx from "classnames";

type Props = {
	value: string;
	id: string;
};

export const Filter: React.FC<Props> = observer(({ value, id }) => {
	const { t } = useTranslationStore();
	const { setActiveFilter, activeFilter, setIsCollapsed, isCollapsed } = useFormStore();
	const isOpen = activeFilter == id;
	return (
		<div
			className={cx("Filter", { open: isOpen })}
			onClick={() => {
				setIsCollapsed(isOpen);
				setActiveFilter(isOpen ? null : id);
			}}
		>
			<span>{t(value)}</span>
		</div>
	);
});
