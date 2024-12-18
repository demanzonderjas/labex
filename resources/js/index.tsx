import React, { useState } from "react";
import { render } from "react-dom";
import TranslationStoreProvider from "./contexts/TranslationContext";
import { TranslationStore } from "./stores/TranslationStore";

import { HomePage } from "./pages/HomePage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AboutUsPage } from "./pages/AboutUs";
import ModalStoreProvider from "./contexts/ModalContext";
import { ModalStore } from "./stores/ModalStore";
import { UserStore } from "./stores/UserStore";
import UserStoreProvider from "./contexts/UserContext";

const App: React.FC = () => {
	const [translationStore] = useState(new TranslationStore());
	const [modalStore] = useState(new ModalStore());
	const [userStore] = useState(new UserStore());

	return (
		<UserStoreProvider store={userStore}>
			<TranslationStoreProvider store={translationStore}>
				<ModalStoreProvider store={modalStore}>
					<Router>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/about-us" element={<AboutUsPage />} />
						</Routes>
					</Router>
				</ModalStoreProvider>
			</TranslationStoreProvider>
		</UserStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
