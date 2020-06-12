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
import { typeField } from "./fields/type";

export const ExchangeOffer: TForm = {
	header: "requests",
	fields: [
		typeField,
		animalSpeciesField,
		strainField,
		sexField,
		ageField,
		originField,
		spfField,
		organsField,
		storageField,
		dateAvailableField,
		naiveField,
		killMethodField,
		amountField,
		protocolNumberField,
		sampleNumberField
	],
	handler: sendExchangeOffer,
	matchable: true
};
