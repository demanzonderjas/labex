import { Form } from "../../typings/Form";
import { animalSpeciesField } from "./fields/animalSpeciesField";
import { sendExchangeRequest } from "../../queries/sendExchangeRequest";
import { tribeField } from "./fields/tribeField";
import { ageField } from "./fields/age";
import { naiveField } from "./fields/naive";
import { genderField } from "./fields/gender";

export const ExchangeRequest: Form = {
	fields: [animalSpeciesField, tribeField, ageField, naiveField, genderField],
	handler: sendExchangeRequest
};
