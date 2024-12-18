import "mobx-react-lite/batchingForReactDom";
import React, { useState } from "react";
import { render } from "react-dom";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";

import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { MatchesPage } from "./pages/admin/Matches";
import { AdminDashboardPage } from "./pages/admin/Dashboard";
import { Sidebar } from "./components/admin/Sidebar";
import { AdminFAQPage } from "./pages/admin/FAQ";
import { FAQEditPage } from "./pages/admin/FAQEdit";
import { FAQCreatePage } from "./pages/admin/FAQCreate";
import { ModalStore } from "./stores/ModalStore";
import ModalStoreProvider from "./contexts/ModalContext";
import { UsersPage } from "./pages/admin/Users";
import { UserCreatePage } from "./pages/admin/UserCreate";
import { ModalWrapper } from "./components/base/ModalWrapper";
import { AdminAlertsPage } from "./pages/admin/Alerts";
import { OffersPage } from "./pages/admin/Offers";
import { AdminEditOfferPage } from "./pages/admin/EditOfferPage";

const App: React.FC = () => {
	const [translationStore] = useState(new TranslationStore());
	const [modalStore] = useState(new ModalStore());
	return (
		<TranslationStoreProvider store={translationStore}>
			<ModalStoreProvider store={modalStore}>
				<BrowserRouter>
					<div className="App Admin">
						<Sidebar />
						<div className="page-wrapper">
							<Routes>
								<Route path="/admin" element={<AdminDashboardPage />}></Route>
								<Route
									path="/admin/dashboard"
									element={<AdminDashboardPage />}
								></Route>
								<Route path="/admin/matches" element={<MatchesPage />}></Route>
								<Route path="/admin/offers" element={<OffersPage />}></Route>
								<Route
									path="/admin/offers/edit/:offer_id"
									element={<AdminEditOfferPage />}
								></Route>
								<Route path="/admin/faq" element={<AdminFAQPage />}></Route>
								<Route path="/admin/faq/create" element={<FAQCreatePage />}></Route>
								<Route path="/admin/faq/edit/:id" element={<FAQEditPage />}></Route>
								<Route path="/admin/users" element={<UsersPage />}></Route>
								<Route
									path="/admin/users/add-user"
									element={<UserCreatePage />}
								></Route>
								<Route path="/admin/alerts" element={<AdminAlertsPage />}></Route>
							</Routes>
						</div>
						<ModalWrapper />
					</div>
				</BrowserRouter>
			</ModalStoreProvider>
		</TranslationStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
