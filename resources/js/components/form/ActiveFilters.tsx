import React from "react";
import { useFormStore } from "../../hooks/useFormStore";
import { observer } from "mobx-react-lite";
import { Filter } from "./Filter";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { FilterListIcon } from "../icons/FilterListIcon";

type Props = {
	collapsed: boolean;
};

export const ActiveFilters: React.FC<Props> = observer(({ collapsed }) => {
	const { filters } = useFormStore();
	const { t } = useTranslationStore();

	return (
		<div className="ActiveFilters">
			<div className="FilterOverview Filter">
				<span>{t("filter_options")}</span>
				<FilterListIcon />
			</div>
			{filters.map(filter => (
				<Filter key={filter.id} value={filter.value} />
			))}
		</div>
	);
});
