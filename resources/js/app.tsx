import "mobx-react-lite/batchingForReactDom";
import React, { useState } from "react";
import { render } from "react-dom";
import FormStoreProvider from "./contexts/FormContext";
import { Form } from "./components/Form";
import { FormStore } from "./stores/FormStore";
import { ExchangeRequest } from "./data/forms/ExchangeRequest";

const App: React.FC = () => {
	const [formStore] = useState(new FormStore(ExchangeRequest));

	return (
		<FormStoreProvider store={formStore}>
			<div className="App">
				<Form />
			</div>
		</FormStoreProvider>
	);
};

render(<App />, document.getElementById("app"));
