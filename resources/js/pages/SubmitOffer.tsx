import React, { useState } from "react";
import { ExchangeAttemptStore } from "../stores/ExchangeAttemptStore";
import ExchangeAttemptStoreProvider from "../contexts/ExchangeAttemptContext";
import { FormWrapper } from "../components/FormWrapper";
import { SubmitOfferForm } from "../data/forms/ExchangeAttemptOffer";
import { useUserStore } from "../hooks/useUserStore";
import { useTranslationStore } from "../hooks/useTranslationStore";
import { SystemMessage } from "../components/base/SystemMessage";
import { observer } from "mobx-react-lite";

export const SubmitOfferPage = observer(() => {
	const [attemptStore] = useState(new ExchangeAttemptStore());
	const { userCanAddContent } = useUserStore();
	const { t } = useTranslationStore();

	if (!userCanAddContent) return <SystemMessage message="you_are_not_allowed_to_add_content" />;

	return (
		<ExchangeAttemptStoreProvider store={attemptStore}>
			<FormWrapper form={SubmitOfferForm} handleSuccess={attemptStore.addAttempt} />
		</ExchangeAttemptStoreProvider>
	);
});
