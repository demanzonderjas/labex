import { TForm } from "../../typings/Form";
import { animalSpeciesField } from "./fields/animalSpecies";
import { sendExchangeAttempt } from "../../queries/sendExchangeAttempt";
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
import { protocolNumberField } from "./fields/protocolNumber";
import { flowchartModal } from "../modals/flowchart";
import { attemptTypeRequestField } from "./fields/attemptType";

export const FilterOffersForm: TForm = {
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
		amountRequestedField,
		attemptTypeRequestField
	],
	handler: sendExchangeAttempt,
	matchable: true,
	infoModal: flowchartModal
};

const specFields = [...FilterOffersForm.fields].filter(f => f.id != "date_requested");
const ageFieldIdx = specFields.findIndex(f => f.id == "age");
specFields.splice(ageFieldIdx, 1, ageRequestRangeField);

export const FilterRequestsForm: TForm = {
	...FilterOffersForm,
	header: "requests",
	intro: "requests_intro",
	fields: specFields,
	submitLabel: "submit_my_offer",
	hideSubmit: false
};

const matchCardFields = [...FilterOffersForm.fields];
const ageOfferFieldIdx = matchCardFields.findIndex(f => f.label == "age_offer");
matchCardFields.splice(ageOfferFieldIdx, 1, ageRangeRequestField);

export const RequestMatchCardFields: TForm = {
	...FilterOffersForm,
	fields: [...matchCardFields, protocolNumberField, extraInfoField]
};

export const SubmitRequestForm: TForm = {
	...FilterOffersForm,
	fields: [...FilterOffersForm.fields, protocolNumberField, extraInfoField],
	matchable: false,
	header: "submit_request",
	intro: "submit_request_description",
	submitLabel: "submit",
	allowCancel: true
};