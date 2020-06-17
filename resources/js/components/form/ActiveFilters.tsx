import React from "react";
import { useFormStore } from "../../hooks/useFormStore";
import { observer } from "mobx-react-lite";
import { Filter } from "./Filter";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { FilterListIcon } from "../icons/FilterListIcon";
import cx from "classnames";

export const ActiveFilters: React.FC = observer(() => {
	const { filters, setIsCollapsed, isCollapsed } = useFormStore();
	const { t } = useTranslationStore();

	return (
		<div className={cx("ActiveFilters", { open: !isCollapsed })}>
			<div className="FilterOverview Filter" onClick={() => setIsCollapsed(!isCollapsed)}>
				<span>{t("filter_options")}</span>
				<FilterListIcon />
			</div>
			{filters
				.filter(filter => !filter.hidden)
				.map(filter => (
					<Filter
						key={filter.id}
						id={filter.id}
						value={filter.value}
						customValue={filter.customValue}
					/>
				))}
		</div>
	);
});
