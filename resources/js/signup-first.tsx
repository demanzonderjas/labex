import React, { useState } from "react";
import { render } from "react-dom";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ModalStoreProvider from "./contexts/ModalContext";
import { ModalStore } from "./stores/ModalStore";
import { SignUpFirstPage } from "./pages/SignUpFirst";

const App: React.FC = () => {
	const [translationStore] = useState(new TranslationStore());
	const [modalStore] = useState(new ModalStore());

	return (
		<TranslationStoreProvider store={translationStore}>
			<ModalStoreProvider store={modalStore}>
				<Router>
					<Switch>
						<Route path="/signup-first" exact={true}>
							<SignUpFirstPage />
						</Route>
					</Switch>
				</Router>
			</ModalStoreProvider>
		</TranslationStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
