import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { MatchWrapper } from "../../components/admin/MatchWrapper";
import { ApproveMatchOverview } from "../../components/admin/ApproveMatchOverview";

export const PossibleMatches = observer(() => {
	const { t } = useTranslationStore();
	return (
		<div className="PossibleMatchesPage">
			<h1>{t("possible_matches")}</h1>
			<MatchWrapper>
				<ApproveMatchOverview />
			</MatchWrapper>
		</div>
	);
});
