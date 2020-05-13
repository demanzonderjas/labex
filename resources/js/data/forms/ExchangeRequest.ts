import { Form } from "../../typings/Form";
import { animalSpeciesField } from "./fields/animalSpeciesField";
import { sendExchangeRequest } from "../../queries/sendExchangeRequest";
import { tribeField } from "./fields/tribeField";
import { ageField } from "./fields/age";
import { naiveField } from "./fields/naive";
import { genderField } from "./fields/gender";
import { weightTypeField } from "./fields/weightType";
import { weightField } from "./fields/weight";
import { originField } from "./fields/origin";
import { spfField } from "./fields/spf";
import { microbiomeField } from "./fields/microbiomeField";
import { organsField } from "./fields/organs";

export const ExchangeRequest: Form = {
	fields: [
		animalSpeciesField,
		tribeField,
		ageField,
		weightTypeField,
		weightField,
		originField,
		spfField,
		microbiomeField,
		organsField,
		naiveField,
		genderField
	],
	handler: sendExchangeRequest
};
