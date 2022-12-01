import { TForm } from "../../typings/forms";
import { animalSpeciesField } from "./fields/animalSpecies";
import { strainField } from "./fields/strain";
import { ageField } from "./fields/age";
import { naiveField } from "./fields/naive";
import { sexField } from "./fields/sex";
import { originField } from "./fields/origin";
import { spfField } from "./fields/spf";
import { organsField } from "./fields/organs";
import { storageField } from "./fields/storage";
import { killMethodField } from "./fields/killMethod";
import { amountField } from "./fields/amount";
import { protocolNumberField } from "./fields/protocolNumber";
import { typeField } from "./fields/type";
import { dateConservedField } from "./fields/dateConserved";
import { extraInfoField } from "./fields/extraInfo";
import { withRequired } from "../../utils/formatting/fields";
import { flowchartModal } from "../modals/flowchart";
import { sendExchangeAttempt } from "../../queries/sendExchangeAttempt";
import { attemptTypeOfferField } from "./fields/attemptType";
import {
	adoptionCodeField,
	adoptionField,
	adoptionFilterField,
	userField
} from "./fields/adoption";
import { locationField } from "./fields/location";
import { dateAvailableEndField, dateAvailableStartField } from "./fields/dateAvailable";
import { FilterOffersForm } from "./ExchangeAttemptRequest";
import { statusField } from "./fields/status";
import { idField } from "./fields/faq/id";
import { updateAdoptionOffer } from "../../queries/admin/updateAdoptionOffer";

export const SubmitOfferForm: TForm = {
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
		dateAvailableStartField,
		dateAvailableEndField,
		dateConservedField,
		naiveField,
		killMethodField,
		amountField,
		protocolNumberField,
		adoptionField,
		locationField,
		extraInfoField,
		attemptTypeOfferField
	],
	handler: sendExchangeAttempt,
	matchable: false,
	infoModal: flowchartModal,
	allowCancel: true,
	splitByRequired: true
};

export const EditOfferForm: TForm = {
	...SubmitOfferForm,
	handler: null,
	header: "edit_offer",
	intro: "edit_offer_intro",
	infoModal: null
};

export const ConfirmOfferMatchForm: TForm = {
	...SubmitOfferForm,
	header: null,
	intro: "confirm_offer_description",
	submitLabel: "confirm",
	matchable: false,
	infoModal: null,
	allowCancel: false
};

export const AdminOffersForm: TForm = {
	...FilterOffersForm,
	fields: [...FilterOffersForm.fields, adoptionFilterField, statusField],
	intro: null,
	matchable: false,
	header: null,
	hideSubmit: true
};

export const OfferAdoptionForm: TForm = {
	handler: updateAdoptionOffer,
	fullWidthFields: true,
	fields: [idField, userField, adoptionCodeField],
	intro: null,
	matchable: false,
	header: null
};
