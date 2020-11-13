import React, { useState } from "react";
import { render } from "react-dom";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";

import { HomePage } from "./pages/HomePage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AboutUsPage } from "./pages/AboutUs";

const App: React.FC = () => {
	const [translationStore] = useState(new TranslationStore());
	return (
		<TranslationStoreProvider store={translationStore}>
			<Router>
				<Switch>
					<Route path="/" exact={true}>
						<HomePage />
					</Route>
					<Route path="/about-us" exact={true}>
						<AboutUsPage />
					</Route>
				</Switch>
			</Router>
		</TranslationStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
