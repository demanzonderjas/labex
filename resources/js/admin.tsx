import "mobx-react-lite/batchingForReactDom";
import React, { useState } from "react";
import { render } from "react-dom";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";
import { Header } from "./components/layout/Header";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PossibleMatches } from "./pages/admin/PossibleMatches";
import { AdminHeader } from "./components/admin/Header";
import { AdminDashboardPage } from "./pages/admin/Dashboard";

const App: React.FC = () => {
	const [translationStore] = useState(new TranslationStore());
	return (
		<TranslationStoreProvider store={translationStore}>
			<Router>
				<div className="App">
					<AdminHeader />
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
						</Switch>
					</div>
				</div>
			</Router>
		</TranslationStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
