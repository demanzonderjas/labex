import { observer } from "mobx-react-lite";
import React from "react";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { convertValidOffersToOrigin, exportToExcel } from "../../utils/excel/export";
import { convertAttemptsToMatches, formatAttemptsForExport } from "../../utils/formatting/matches";
import { Button } from "../base/Button";

export const ExportOffers: React.FC = observer(() => {
	const { filters, targetFields, offers } = useExchangeAttemptStore();
	const validOffers = convertAttemptsToMatches(offers, filters, targetFields);
	const originOffers = convertValidOffersToOrigin(validOffers, offers);
	const exportableOffers = formatAttemptsForExport(originOffers);

	return (
		<div className="ExportOffers margin-20">
			<Button
				label="export"
				handleClick={() => exportToExcel(exportableOffers, "offers-export.tsx")}
				classes={{ tertiary: true }}
			/>
		</div>
	);
});
