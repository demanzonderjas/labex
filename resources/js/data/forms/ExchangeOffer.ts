import { TForm } from "../../typings/Form";
import { animalSpeciesField } from "./fields/animalSpecies";
import { strainField } from "./fields/strain";
import { ageField } from "./fields/age";
import { naiveField } from "./fields/naive";
import { sexField } from "./fields/sex";
import { originField } from "./fields/origin";
import { spfField } from "./fields/spf";
import { organsField } from "./fields/organs";
import { storageField } from "./fields/storage";
import { dateAvailableField } from "./fields/dateAvailable";
import { killMethodField } from "./fields/killMethod";
import { amountField } from "./fields/amount";
import { protocolNumberField } from "./fields/protocolNumber";
import { sampleNumberField } from "./fields/sampleNumber";
import { sendExchangeOffer } from "../../queries/sendExchangeOffer";
import { typeField } from "./fields/type";
import { dateConservedField } from "./fields/dateConserved";
import { extraInfoField } from "./fields/extraInfo";

export const ExchangeOffer: TForm = {
	header: "requests",
	intro: "offers_intro",
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
		dateConservedField,
		naiveField,
		killMethodField,
		amountField,
		protocolNumberField,
		sampleNumberField,
		extraInfoField
	],
	handler: sendExchangeOffer,
	matchable: true
};

export const SubmitOfferForm = {
	...ExchangeOffer,
	handler: sendExchangeOffer,
	header: "submit_offer",
	intro: "submit_offer_intro",
	matchable: false
};
