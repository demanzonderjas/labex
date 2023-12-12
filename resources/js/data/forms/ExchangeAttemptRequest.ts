import { TForm } from "../../typings/forms";
import { animalSpeciesField } from "./fields/animalSpecies";
import { sendExchangeAttempt } from "../../queries/sendExchangeAttempt";
import { strainRequestField } from "./fields/strain";
import { ageRequestField, ageMinField, ageMaxField, ageTypeField, ageRequestRangeField, ageRangeRequestField } from "./fields/age";
import { sexRequestField } from "./fields/sex";
import { originField } from "./fields/origin";
import { spfField } from "./fields/spf";
import { organsRequestField } from "./fields/organs";
import { storageRequestField } from "./fields/storage";
import { dateRequestedField } from "./fields/dateAvailable";
import { killMethodField } from "./fields/killMethod";
import { amountRequestedField } from "./fields/amount";
import { typeField } from "./fields/type";
import { animalNumbersField, extraInfoField } from "./fields/extraInfo";
import { protocolNumberField } from "./fields/protocolNumber";
import { flowchartModal } from "../modals/flowchart";
import { attemptTypeRequestField } from "./fields/attemptType";
import { adoptionField, adoptionFilterField } from "./fields/adoption";
import { statusField } from "./fields/status";
import { organisationFilterField } from "./fields/user/organisation";

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
		attemptTypeRequestField,
		organisationFilterField
	],
	handler: sendExchangeAttempt,
	matchable: true,
	infoModal: flowchartModal
};

const specFields = [...FilterOffersForm.fields];
const ageFieldIdx = specFields.findIndex(f => f.id == "age");
specFields.splice(ageFieldIdx, 1, ageRequestRangeField);
const filterFields = [...FilterOffersForm.fields].filter(f => f.id != "date_requested");
filterFields.splice(ageFieldIdx, 1, ageRequestRangeField);

export const RequestSpecificationsForm: TForm = {
	...FilterOffersForm,
	header: "requests",
	intro: "requests_intro",
	fields: specFields,
	submitLabel: "submit_my_offer",
	hideSubmit: false
};

export const FilterRequestsForm: TForm = {
	...FilterOffersForm,
	header: "requests",
	intro: "requests_intro",
	fields: filterFields,
	submitLabel: "submit_my_offer",
	hideSubmit: false
};

const matchCardFields = [...FilterOffersForm.fields];
const ageOfferFieldIdx = matchCardFields.findIndex(f => f.label == "age_offer");
matchCardFields.splice(ageOfferFieldIdx, 1, ageRangeRequestField);

export const RequestMatchCardFields: TForm = {
	...FilterOffersForm,
	fields: [...matchCardFields, protocolNumberField, extraInfoField, animalNumbersField]
};

export const SubmitRequestForm: TForm = {
	...FilterOffersForm,
	fields: [...FilterOffersForm.fields, protocolNumberField, extraInfoField, animalNumbersField],
	matchable: false,
	header: "submit_request",
	intro: "submit_request_description",
	submitLabel: "submit",
	allowCancel: true
};

export const EditRequestForm: TForm = {
	...SubmitRequestForm,
	header: "edit_request",
	intro: "edit_request_description"
};
