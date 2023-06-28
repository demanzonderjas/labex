import React from "react";
import { Button } from "../base/Button";
import { getMyLatestExchangeAttempts } from "../../queries/getExchangeAttempts";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { observer } from "mobx-react-lite";
import { ExchangeAttemptOverview } from "../overviews/ExchangeAttemptOverview";
import { requestMatchCells } from "../../data/tables/matches";
import { TExchangeAttemptType } from "../../typings/exchanges";

export const MatchOutstanding: React.FC = observer(() => {
	const { setAttempts, requests } = useExchangeAttemptStore();
	const { t } = useTranslationStore();

	const loadRequests = async () => {
		const attempts = await getMyLatestExchangeAttempts();
		setAttempts(attempts.exchange_attempts || []);
	};

	return (
		<div className="load-request" style={{ marginBottom: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
			<label>{t("load_your_outstanding_request")}</label>
			<Button label="load_requests" classes={{ tertiary: true }} handleClick={loadRequests} />
			{!!requests.length && (
				<ExchangeAttemptOverview
					mineOnly={true}
					specsToShow={requestMatchCells}
					type={TExchangeAttemptType.Request}
					SHOW_LIMIT={10}
				/>
			)}
		</div>
	);
});
