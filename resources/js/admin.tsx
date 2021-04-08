import "mobx-react-lite/batchingForReactDom";
import React, { useState } from "react";
import { render } from "react-dom";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PossibleMatches } from "./pages/admin/PossibleMatches";
import { AdminDashboardPage } from "./pages/admin/Dashboard";
import { Sidebar } from "./components/admin/Sidebar";
import { AdminFAQPage } from "./pages/admin/FAQ";
import { FAQEditPage } from "./pages/admin/FAQEdit";
import { FAQCreatePage } from "./pages/admin/FAQCreate";
import { SignupsPage } from "./pages/admin/Signups";
import { ModalStore } from "./stores/ModalStore";
import ModalStoreProvider from "./contexts/ModalContext";

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
							<Switch>
								<Route path="/admin" exact={true}>
									<AdminDashboardPage />
								</Route>
								<Route path="/admin/dashboard">
									<AdminDashboardPage />
								</Route>
								<Route path="/admin/possible-matches" exact={true}>
									<PossibleMatches />
								</Route>
								<Route path="/admin/signups" exact={true}>
									<SignupsPage />
								</Route>
								<Route path="/admin/faq" exact={true}>
									<AdminFAQPage />
								</Route>
								<Route path="/admin/faq/create" exact={true}>
									<FAQCreatePage />
								</Route>
								<Route path="/admin/faq/edit/:id" exact={true}>
									<FAQEditPage />
								</Route>
							</Switch>
						</div>
					</div>
				</Router>
			</ModalStoreProvider>
		</TranslationStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
