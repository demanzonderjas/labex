import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { observer } from "mobx-react-lite";
import { useFormStore } from "../../hooks/useFormStore";
import cx from "classnames";

type Props = {
	value: string;
	id: string;
	customValue?: Function;
};

export const Filter: React.FC<Props> = observer(({ value, id, customValue }) => {
	const { t } = useTranslationStore();
	const { fields } = useFormStore();
	const { setActiveFilter, activeFilter, setIsCollapsed } = useFormStore();
	const isOpen = activeFilter == id;

	const labelValue = customValue ? customValue(fields) : t(value);

	return (
		<div
			className={cx("Filter", { open: isOpen })}
			onClick={() => {
				setIsCollapsed(isOpen);
				setActiveFilter(isOpen ? null : id);
			}}
		>
			<span>{labelValue}</span>
		</div>
	);
});
