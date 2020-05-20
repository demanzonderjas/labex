import "mobx-react-lite/batchingForReactDom";
import React, { useState } from "react";
import { render } from "react-dom";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";
import { Header } from "./components/layout/Header";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DashboardPage } from "./pages/Dashboard";
import { OfferFormPage } from "./pages/OfferForm";
import { RequestFormPage } from "./pages/RequestForm";
import { MyMatchesPage } from "./pages/MyMatches";

const App: React.FC = () => {
	const [translationStore] = useState(new TranslationStore());
	return (
		<TranslationStoreProvider store={translationStore}>
			<Router>
				<div className="App">
					<Header />
					<div className="page-wrapper">
						<Switch>
							<Route path="/" exact={true}>
								<DashboardPage />
							</Route>
							<Route path="*/dashboard">
								<DashboardPage />
							</Route>
							<Route path="*/offers">
								<OfferFormPage />
							</Route>
							<Route path="*/requests">
								<RequestFormPage />
							</Route>
							<Route path="*/my-matches">
								<MyMatchesPage />
							</Route>
						</Switch>
					</div>
				</div>
			</Router>
		</TranslationStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
