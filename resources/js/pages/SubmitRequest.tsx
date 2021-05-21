import React, { useState } from "react";
import { SampleStore } from "../stores/SampleStore";
import SampleStoreProvider from "../contexts/SampleContext";
import { FormWrapper } from "../components/FormWrapper";
import { SubmitRequestForm } from "../data/forms/ExchangeRequest";
import { Button } from "../components/base/Button";
import { useHistory } from "react-router";

export const SubmitRequestPage = () => {
	const [sampleStore] = useState(new SampleStore());
	const history = useHistory();

	return (
		<SampleStoreProvider store={sampleStore}>
			<Button label="cancel" handleClick={() => history.goBack()} />
			<FormWrapper
				form={SubmitRequestForm}
				handleSuccess={sampleStore.addRequest}
				handleUpdate={fields => console.log(fields)}
			/>
		</SampleStoreProvider>
	);
};
