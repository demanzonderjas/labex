import { TForm } from "../../typings/Form";
import { animalSpeciesField } from "./fields/animalSpecies";
import { strainField, strainRequestField } from "./fields/strain";
import { ageField, ageRequestField, ageTypeField, ageMinField, ageMaxField } from "./fields/age";
import { naiveField } from "./fields/naive";
import { sexField, sexRequestField } from "./fields/sex";
import { originField } from "./fields/origin";
import { spfField } from "./fields/spf";
import { organsField, organsRequestField } from "./fields/organs";
import { storageField, storageRequestField } from "./fields/storage";
import { dateAvailableField, dateRequestedField } from "./fields/dateAvailable";
import { killMethodField } from "./fields/killMethod";
import { amountField, amountRequestedField } from "./fields/amount";
import { protocolNumberField } from "./fields/protocolNumber";
import { sampleNumberField } from "./fields/sampleNumber";
import { sendExchangeOffer } from "../../queries/sendExchangeOffer";
import { typeField } from "./fields/type";
import { dateConservedField } from "./fields/dateConserved";
import { extraInfoField } from "./fields/extraInfo";
import { withRequired } from "../../utils/formatting/fields";

export const ExchangeOffer: TForm = {
	header: "submit_offer",
	intro: "submit_offer_intro",
	fields: [
		withRequired(typeField),
		withRequired(animalSpeciesField),
		strainField,
		sexField,
		ageField,
		withRequired(originField),
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
	matchable: false
};

export const ExchangeRequestsFilter: TForm = {
	header: "requests",
	intro: "requests_intro",
	fields: [
		typeField,
		animalSpeciesField,
		strainRequestField,
		sexRequestField,
		ageRequestField,
		ageTypeField,
		ageMinField,
		ageMaxField,
		spfField,
		organsRequestField,
		originField,
		storageRequestField,
		dateRequestedField,
		killMethodField,
		amountRequestedField
	],
	handler: sendExchangeOffer,
	matchable: true
};

export const ExchangeOfferMatch: TForm = {
	...ExchangeOffer,
	header: "confirm_offer",
	intro: "confirm_offer_description",
	submitLabel: "confirm",
	matchable: false
};
