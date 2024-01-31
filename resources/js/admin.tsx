import "mobx-react-lite/batchingForReactDom";
import React, { useState } from "react";
import { render } from "react-dom";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MatchesPage } from "./pages/admin/Matches";
import { AdminDashboardPage } from "./pages/admin/Dashboard";
import { Sidebar } from "./components/admin/Sidebar";
import { AdminFAQPage } from "./pages/admin/FAQ";
import { FAQEditPage } from "./pages/admin/FAQEdit";
import { FAQCreatePage } from "./pages/admin/FAQCreate";
import { SignupsPage } from "./pages/admin/Signups";
import { ModalStore } from "./stores/ModalStore";
import ModalStoreProvider from "./contexts/ModalContext";
import { UsersPage } from "./pages/admin/Users";
import { UserCreatePage } from "./pages/admin/UserCreate";
import { ModalWrapper } from "./components/base/ModalWrapper";
import { AdminAlertsPage } from "./pages/admin/Alerts";
import { OffersPage } from "./pages/admin/Offers";
import { OfferAdoptionPage } from "./pages/admin/OfferAdoption";
import { AdminEditOfferPage } from "./pages/admin/EditOfferPage";

const App: React.FC = () => {
	const [translationStore] = useState(new TranslationStore());
	const [modalStore] = useState(new ModalStore());
	return (
		<TranslationStoreProvider store={translationStore}>
			<ModalStoreProvider store={modalStore}>
				<Router>
					<div className="App Admin">
						<Sidebar />
						<div className="page-wrapper">
							<Routes>
								<Route path="/admin">
									<AdminDashboardPage />
								</Route>
								<Route path="/admin/dashboard">
									<AdminDashboardPage />
								</Route>
								<Route path="/admin/matches">
									<MatchesPage />
								</Route>
								<Route path="/admin/offers">
									<OffersPage />
								</Route>
								<Route path="/admin/offers/edit/:offer_id">
									<AdminEditOfferPage />
								</Route>
								<Route path="/admin/offers/adoption/:offer_id">
									<OfferAdoptionPage />
								</Route>
								<Route path="/admin/signups">
									<SignupsPage />
								</Route>
								<Route path="/admin/faq">
									<AdminFAQPage />
								</Route>
								<Route path="/admin/faq/create">
									<FAQCreatePage />
								</Route>
								<Route path="/admin/faq/edit/:id">
									<FAQEditPage />
								</Route>
								<Route path="/admin/users">
									<UsersPage />
								</Route>
								<Route path="/admin/users/add-user">
									<UserCreatePage />
								</Route>
								<Route path="/admin/alerts">
									<AdminAlertsPage />
								</Route>
							</Routes>
						</div>
						<ModalWrapper />
					</div>
				</Router>
			</ModalStoreProvider>
		</TranslationStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
