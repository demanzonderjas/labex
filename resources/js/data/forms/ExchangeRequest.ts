import { TForm } from "../../typings/Form";
import { animalSpeciesField } from "./fields/animalSpecies";
import { sendExchangeRequest } from "../../queries/sendExchangeRequest";
import { strainRequestField } from "./fields/strain";
import {
	ageRequestField,
	ageMinField,
	ageMaxField,
	ageTypeField,
	ageRequestRangeField
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

const specFields = [...ExchangeRequest.fields];
const ageFieldIdx = specFields.findIndex(f => f.id == "age");
specFields.splice(ageFieldIdx, 1, ageRequestRangeField);

export const ExchangeRequestSpecs = {
	...ExchangeRequest,
	fields: specFields
};
