import React, { useState } from "react";
import { render } from "react-dom";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ModalStoreProvider from "./contexts/ModalContext";
import { ModalStore } from "./stores/ModalStore";
import { VerifyEmailPage } from "./pages/VerifyEmailPage";

const App: React.FC = () => {
	const [translationStore] = useState(new TranslationStore());
	const [modalStore] = useState(new ModalStore());

	return (
		<TranslationStoreProvider store={translationStore}>
			<ModalStoreProvider store={modalStore}>
				<Router>
					<Routes>
						<Route path="/email/verify" element={<VerifyEmailPage />}></Route>
					</Routes>
				</Router>
			</ModalStoreProvider>
		</TranslationStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
