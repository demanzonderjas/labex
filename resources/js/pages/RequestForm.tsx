import React from "react";
import { ExchangeRequest } from "../data/forms/ExchangeRequest";
import { FormWrapper } from "../components/FormWrapper";

export const RequestFormPage = () => {
	return <FormWrapper form={ExchangeRequest} />;
};
