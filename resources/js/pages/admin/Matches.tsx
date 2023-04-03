import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { MatchWrapper } from "../../components/admin/MatchWrapper";
import { ApproveMatchOverview } from "../../components/admin/ApproveMatchOverview";
import { PreviousMatchOverview } from "../../components/admin/PreviousMatchOverview";
import { Button } from "../../components/base/Button";

export const MatchesPage = observer(() => {
	const { t } = useTranslationStore();
	const [showPrevious, setShowPrevious] = useState(false);
	return (
		<div className="MatchesPage">
			<h1>{t("matches")}</h1>
			<MatchWrapper>
				<ApproveMatchOverview />
				<h2 style={{ margin: "20px 0" }}>{t("previous_matches")}</h2>
				{!showPrevious && (
					<Button
						label="show_previous_matches"
						classes={{ tertiary: true }}
						handleClick={() => setShowPrevious(true)}
					/>
				)}
				{showPrevious && <PreviousMatchOverview />}
			</MatchWrapper>
		</div>
	);
});
