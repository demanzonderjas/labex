import { TForm, TFormFieldName } from "../../typings/forms";
import { animalSpeciesField } from "./fields/animalSpecies";
import { strainField } from "./fields/strain";
import { ageField } from "./fields/age";
import { naiveField } from "./fields/naive";
import { sexField } from "./fields/sex";
import { originField, originIdField } from "./fields/origin";
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
	adoptionAmountField,
	adoptionCodeField,
	adoptionCodeSearchField,
	adoptionField,
	adoptionFilterField,
	isActiveField
} from "./fields/adoption";
import { locationField } from "./fields/location";
import {
	dateAvailableEndAsAdminField,
	dateAvailableEndField,
	dateAvailableStartAsAdminField,
	dateAvailableStartField,
	yearSelectField
} from "./fields/dateAvailable";
import { FilterOffersForm } from "./ExchangeAttemptRequest";
import { statusField } from "./fields/status";
import { idField } from "./fields/faq/id";
import { updateAdoptionOffer } from "../../queries/admin/updateAdoptionOffer";
import { TSpecificationName } from "../../typings/exchanges";
import { userFilterField } from "./fields/user/userFilter";

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

const dateAvailableStartFieldIndex = EditOfferForm.fields.findIndex(
	f => f.id === TSpecificationName.DateAvailableStart
);
const dateAvailableEndFieldIndex = EditOfferForm.fields.findIndex(
	f => f.id === TSpecificationName.DateAvailableEnd
);
const editOfferAsAdminFields = [...EditOfferForm.fields];
editOfferAsAdminFields[dateAvailableStartFieldIndex] = dateAvailableStartAsAdminField;
editOfferAsAdminFields[dateAvailableEndFieldIndex] = dateAvailableEndAsAdminField;

export const EditOfferAsAdminForm: TForm = {
	...EditOfferForm,
	fields: editOfferAsAdminFields
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

const adminOfferFields = [
	...FilterOffersForm.fields.filter(f => f.id !== TSpecificationName.DateRequested),
	yearSelectField,
	adoptionFilterField,
	statusField,
	adoptionCodeSearchField,
	userFilterField,
	originIdField
];

export const AdminOffersForm: TForm = {
	...FilterOffersForm,
	fields: adminOfferFields,
	intro: null,
	matchable: false,
	header: null,
	hideSubmit: true
};

export const OfferAdoptionForm: TForm = {
	handler: updateAdoptionOffer,
	fullWidthFields: true,
	fields: [idField, adoptionAmountField, adoptionCodeField, isActiveField],
	intro: null,
	data: null,
	matchable: false,
	header: null
};
