import "mobx-react-lite/batchingForReactDom";
import React, { useState } from "react";
import { render } from "react-dom";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PossibleMatches } from "./pages/admin/PossibleMatches";
import { AdminDashboardPage } from "./pages/admin/Dashboard";
import { Sidebar } from "./components/admin/Sidebar";

const App: React.FC = () => {
	const [translationStore] = useState(new TranslationStore());
	return (
		<TranslationStoreProvider store={translationStore}>
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
						</Switch>
					</div>
				</div>
			</Router>
		</TranslationStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
