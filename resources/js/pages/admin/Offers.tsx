import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { ExchangeAttemptStore } from "../../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../../contexts/ExchangeAttemptContext";
import { FormWrapper } from "../../components/FormWrapper";
import { adminOfferCells } from "../../data/tables/offers";
import { TExchangeAttemptType } from "../../typings/exchanges";
import { ExchangeAttemptOverview } from "../../components/overviews/ExchangeAttemptOverview";
import { AdminOffersForm } from "../../data/forms/ExchangeAttemptOffer";
import { ExportOffers } from "../../components/admin/ExportOffers";

export const OffersPage = observer(() => {
	const { t } = useTranslationStore();
	const [sampleStore] = useState(new ExchangeAttemptStore());
	return (
		<div className="OffersPage">
			<h1>{t("offers")}</h1>
			<ExchangeAttemptStoreProvider store={sampleStore}>
				<FormWrapper
					form={AdminOffersForm}
					handleSuccess={null}
					handleUpdate={sampleStore.setFilters}
				/>
				<ExchangeAttemptOverview
					adminView={true}
					specsToShow={adminOfferCells}
					type={TExchangeAttemptType.Offer}
					SHOW_LIMIT={10}
				/>
				<ExportOffers />
			</ExchangeAttemptStoreProvider>
		</div>
	);
});
