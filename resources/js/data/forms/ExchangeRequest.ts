import { TForm } from "../../typings/Form";
import { animalSpeciesField } from "./fields/animalSpecies";
import { sendExchangeRequest } from "../../queries/sendExchangeRequest";
import { tribeField } from "./fields/tribe";
import { ageField, ageRequestField } from "./fields/age";
import { naiveField } from "./fields/naive";
import { genderRequestField } from "./fields/gender";
import { weightTypeField } from "./fields/weightType";
import { weightField } from "./fields/weight";
import { originField } from "./fields/origin";
import { spfField } from "./fields/spf";
import { microbiomeField } from "./fields/microbiome";
import { organsRequestField } from "./fields/organs";
import { storageRequestField } from "./fields/storage";
import { dateRequestedField } from "./fields/dateAvailable";
import { inconvenienceLevelField } from "./fields/inconvenienceLevel";
import { killMethodField } from "./fields/killMethod";
import { amountRequestedField } from "./fields/amount";
import { sampleNumberRequestField } from "./fields/sampleNumber";
import { isAgeRelevantField } from "./fields/isAgeRelevant";

export const ExchangeRequest: TForm = {
	header: "exchange_request",
	fields: [
		animalSpeciesField,
		tribeField,
		genderRequestField,
		isAgeRelevantField,
		ageRequestField,
		weightTypeField,
		weightField,
		originField,
		spfField,
		microbiomeField,
		organsRequestField,
		storageRequestField,
		dateRequestedField,
		naiveField,
		inconvenienceLevelField,
		killMethodField,
		amountRequestedField,
		sampleNumberRequestField
	],
	handler: sendExchangeRequest
};
