import { TForm } from "../../typings/Form";
import { animalSpeciesField } from "./fields/animalSpecies";
import { sendExchangeRequest } from "../../queries/sendExchangeRequest";
import { strainRequestField } from "./fields/strain";
import {
	ageRequestField,
	ageMinField,
	ageMaxField,
	ageTypeField,
	ageRequestRangeField,
	ageRangeRequestField
} from "./fields/age";
import { sexRequestField } from "./fields/sex";
import { originField } from "./fields/origin";
import { spfField } from "./fields/spf";
import { organsRequestField } from "./fields/organs";
import { storageRequestField } from "./fields/storage";
import { dateRequestedField } from "./fields/dateAvailable";
import { killMethodField } from "./fields/killMethod";
import { amountRequestedField } from "./fields/amount";
import { typeField } from "./fields/type";
import { extraInfoField } from "./fields/extraInfo";

export const ExchangeRequest: TForm = {
	header: "offers",
	intro: "offers_intro",
	submitLabel: "submit_my_request",
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
	handler: sendExchangeRequest,
	matchable: true
};

const specFields = [...ExchangeRequest.fields].filter(f => f.id != "date_requested");
const ageFieldIdx = specFields.findIndex(f => f.id == "age");
specFields.splice(ageFieldIdx, 1, ageRequestRangeField);

export const ExchangeRequestSpecs: TForm = {
	...ExchangeRequest,
	header: "requests",
	intro: "requests_intro",
	fields: specFields,
	submitLabel: "submit_my_offer",
	hideSubmit: false 
};

export const ExchangeRequestMatch: TForm = {
	...ExchangeRequestSpecs,
	header: "confirm_request",
	intro: "confirm_request_description",
	matchable: false,
	submitLabel: "submit",
	hideSubmit: false
};

const matchCardFields = [...ExchangeRequest.fields];
const ageOfferFieldIdx = matchCardFields.findIndex(f => f.label == "age_offer");
matchCardFields.splice(ageOfferFieldIdx, 1, ageRangeRequestField);

export const ExchangeRequestMatchCard: TForm = {
	...ExchangeRequest,
	fields: [...matchCardFields, extraInfoField]
};

export const SubmitExchangeRequest: TForm = {
	...ExchangeRequest,
	matchable: false,
	header: "submit_request",
	intro: "submit_request_description",
	submitLabel: "submit"
};
