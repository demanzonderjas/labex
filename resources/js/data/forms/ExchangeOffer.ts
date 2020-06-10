import { TForm } from "../../typings/Form";
import { animalSpeciesField } from "./fields/animalSpecies";
import { strainField } from "./fields/strain";
import { ageField } from "./fields/age";
import { naiveField } from "./fields/naive";
import { sexField } from "./fields/sex";
import { weightTypeField } from "./fields/weightType";
import { weightField } from "./fields/weight";
import { originField } from "./fields/origin";
import { spfField } from "./fields/spf";
import { microbiomeField } from "./fields/microbiome";
import { organsField } from "./fields/organs";
import { storageField } from "./fields/storage";
import { dateAvailableField } from "./fields/dateAvailable";
import { proceduresField } from "./fields/procedures";
import { inconvenienceLevelField } from "./fields/inconvenienceLevel";
import { killMethodField } from "./fields/killMethod";
import { amountField } from "./fields/amount";
import { protocolNumberField } from "./fields/protocolNumber";
import { protocolNumberKnownField } from "./fields/protocolNumberKnown";
import { sampleNumberField } from "./fields/sampleNumber";
import { sendExchangeOffer } from "../../queries/sendExchangeOffer";

export const ExchangeOffer: TForm = {
	header: "requests",
	fields: [
		animalSpeciesField,
		strainField,
		sexField,
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
		inconvenienceLevelField,
		killMethodField,
		amountField,
		protocolNumberKnownField,
		protocolNumberField,
		sampleNumberField
	],
	handler: sendExchangeOffer,
	matchable: true
};
