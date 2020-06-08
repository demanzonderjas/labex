import { TForm } from "../../typings/Form";
import { animalSpeciesField } from "./fields/animalSpecies";
import { sendExchangeRequest } from "../../queries/sendExchangeRequest";
import { strainRequestField } from "./fields/strain";
import { ageRequestField } from "./fields/age";
import { naiveRequestField } from "./fields/naive";
import { sexRequestField } from "./fields/sex";
import { weightTypeField } from "./fields/weightType";
import { weightField } from "./fields/weight";
import { originField } from "./fields/origin";
import { spfField } from "./fields/spf";
import { organsRequestField } from "./fields/organs";
import { storageRequestField } from "./fields/storage";
import { dateRequestedField } from "./fields/dateAvailable";
import { inconvenienceLevelField } from "./fields/inconvenienceLevel";
import { killMethodField } from "./fields/killMethod";
import { amountRequestedField } from "./fields/amount";
import { microbiomeField } from "./fields/microbiome";

export const ExchangeRequest: TForm = {
	header: "exchange_request",
	submitLabel: "submit_my_request",
	fields: [
		originField,
		animalSpeciesField,
		strainRequestField,
		sexRequestField,
		ageRequestField,
		weightTypeField,
		weightField,
		spfField,
		microbiomeField,
		organsRequestField,
		storageRequestField,
		dateRequestedField,
		naiveRequestField,
		inconvenienceLevelField,
		killMethodField,
		amountRequestedField
	],
	handler: sendExchangeRequest
};
