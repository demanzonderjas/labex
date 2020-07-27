import "mobx-react-lite/batchingForReactDom";
import React, { useState } from "react";
import { render } from "react-dom";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";
import { Header } from "./components/layout/Header";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DashboardPage } from "./pages/Dashboard";
import { MyMatchesPage } from "./pages/MyMatches";
import { OffersPage } from "./pages/Offers";
import { RequestsPage } from "./pages/Requests";
import { SubmitOfferPage } from "./pages/SubmitOffer";
import { Footer } from "./components/layout/Footer";
import { SelectOfferMatchPage } from "./pages/SelectOfferMatch";
import ScrollToTop from "./components/layout/ScrollToTop";
import { SelectRequestMatchPage } from "./pages/SelectRequestMatch";

const App: React.FC = () => {
	const [translationStore] = useState(new TranslationStore());
	return (
		<TranslationStoreProvider store={translationStore}>
			<Router>
				<div className="App">
					<ScrollToTop />
					<Header />
					<div className="page-wrapper">
						<Switch>
							<Route path="/" exact={true}>
								<DashboardPage />
							</Route>
							<Route path="/app/dashboard">
								<DashboardPage />
							</Route>
							<Route path="/app/offers" exact={true}>
								<OffersPage />
							</Route>
							<Route path="/app/offers/select/:id">
								<SelectOfferMatchPage />
							</Route>
							<Route path="/app/requests" exact={true}>
								<RequestsPage />
							</Route>
							<Route path="/app/requests/select/:id">
								<SelectRequestMatchPage />
							</Route>
							<Route path="/app/my-matches">
								<MyMatchesPage />
							</Route>
							<Route path="/app/submit-offer">
								<SubmitOfferPage />
							</Route>
						</Switch>
					</div>
					<Footer />
				</div>
			</Router>
		</TranslationStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
