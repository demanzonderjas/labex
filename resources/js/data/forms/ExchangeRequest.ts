import { SelectField } from "../../components/form/SelectField";
import { Form } from "../../typings/Form";
import { animalSpeciesField } from "./fields/animalSpeciesField";
import { sendExchangeRequest } from "../../queries/sendExchangeRequest";

export const ExchangeRequest: Form = {
	fields: [animalSpeciesField],
	handler: sendExchangeRequest
};
