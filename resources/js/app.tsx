import "mobx-react-lite/batchingForReactDom";
import React, { useState } from "react";
import { render } from "react-dom";
import { ExchangeOffer } from "./data/forms/ExchangeOffer";
import { FormWrapper } from "./components/FormWrapper";
import { ExchangeRequest } from "./data/forms/ExchangeRequest";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";
import { Header } from "./components/layout/Header";

const App: React.FC = () => {
	const [translationStore] = useState(new TranslationStore());
	return (
		<TranslationStoreProvider store={translationStore}>
			<div className="App">
				<Header />
				<div className="pages">
					<FormWrapper form={ExchangeOffer} />
					<FormWrapper form={ExchangeRequest} />
				</div>
			</div>
		</TranslationStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
