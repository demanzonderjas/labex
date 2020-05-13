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
import { storageField } from "./fields/storage";
import { dateAvailableField } from "./fields/dateAvailable";
import { proceduresField } from "./fields/procedures";

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
		storageField,
		dateAvailableField,
		naiveField,
		proceduresField,
		genderField
	],
	handler: sendExchangeRequest
};
