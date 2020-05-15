import "mobx-react-lite/batchingForReactDom";
import React from "react";
import { render } from "react-dom";
import { ExchangeOffer } from "./data/forms/ExchangeOffer";
import { FormWrapper } from "./components/FormWrapper";

const App: React.FC = () => {
	return (
		<div className="App">
			<FormWrapper form={ExchangeOffer} />
		</div>
	);
};

render(<App />, document.getElementById("app"));
