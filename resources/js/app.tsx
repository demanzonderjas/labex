import "mobx-react-lite/batchingForReactDom";
import React, { useState } from "react";
import { render } from "react-dom";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";
import { Header } from "./components/layout/Header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DashboardPage } from "./pages/Dashboard";
import { MyMatchesPage } from "./pages/MyMatches";
import { OffersPage } from "./pages/Offers";
import { RequestsPage } from "./pages/Requests";
import { SubmitOfferPage } from "./pages/SubmitOffer";
import { Footer } from "./components/layout/Footer";
import { SelectOfferMatchPage } from "./pages/SelectOfferMatch";
import ScrollToTop from "./components/layout/ScrollToTop";
import { SelectRequestMatchPage } from "./pages/SelectRequestMatch";
import ModalStoreProvider from "./contexts/ModalContext";
import { ModalStore } from "./stores/ModalStore";
import { ModalWrapper } from "./components/base/ModalWrapper";
import { SubmitRequestPage } from "./pages/SubmitRequest";
import { FAQPage } from "./pages/FAQ";
import { UserStore } from "./stores/UserStore";
import UserStoreProvider from "./contexts/UserContext";
import { AlertsPage } from "./pages/Alerts";
import { AddNewAlertPage } from "./pages/AddNewAlert";
import { EditOfferPage } from "./pages/EditOffer";
import { EditRequestPage } from "./pages/EditRequest";

const App: React.FC = () => {
	const [translationStore] = useState(new TranslationStore());
	const [modalStore] = useState(new ModalStore());
	const [userStore] = useState(new UserStore());

	return (
		<UserStoreProvider store={userStore}>
			<TranslationStoreProvider store={translationStore}>
				<ModalStoreProvider store={modalStore}>
					<Router>
						<div className="App">
							<ScrollToTop />
							<Header />
							<div className="page-wrapper">
								<Switch>
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
									<Route path="/app/offers/edit/:id">
										<EditOfferPage />
									</Route>
									<Route path="/app/requests/edit/:id">
										<EditRequestPage />
									</Route>
									<Route path="/app/submit-offer">
										<SubmitOfferPage />
									</Route>
									<Route path="/app/submit-request">
										<SubmitRequestPage />
									</Route>
									<Route path="/app/faq" exact={true}>
										<FAQPage />
									</Route>
									<Route path="/app/alerts" exact={true}>
										<AlertsPage />
									</Route>
									<Route path="/app/alerts/add-new" exact={true}>
										<AddNewAlertPage />
									</Route>
								</Switch>
							</div>
							<Footer />
							<ModalWrapper />
						</div>
					</Router>
				</ModalStoreProvider>
			</TranslationStoreProvider>
		</UserStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
