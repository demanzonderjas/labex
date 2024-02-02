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
import { deviceTypeField, typeField } from "./fields/type";
import { dateConservedField } from "./fields/dateConserved";
import { contactDetailsField, extraInfoField, specificationsField } from "./fields/extraInfo";
import { withRequired } from "../../utils/formatting/fields";
import { flowchartModal } from "../modals/flowchart";
import { sendExchangeAttempt } from "../../queries/sendExchangeAttempt";
import { attemptTypeOfferField } from "./fields/attemptType";
import { locationField } from "./fields/location";
import {
	dateAvailableEndAsAdminField,
	dateAvailableEndField,
	dateAvailableStartAsAdminField,
	dateAvailableStartField,
	yearSelectField,
} from "./fields/dateAvailable";
import { FilterOffersForm } from "./ExchangeAttemptRequest";
import { statusField } from "./fields/status";
import { TSpecificationName } from "../../typings/exchanges";
import { userFilterField } from "./fields/user/userFilter";
import {
	chemicalsAvailabilityField,
	equipmentAvailabilityField,
	partialUseField,
	reasonForAvailabilityField,
} from "./fields/availability";
import { substanceCategoryField, substanceDetailsField } from "./fields/substance";
import { numberField, productProducerField } from "./fields/sampleNumber";
import { disposablePackagingField, packagingMethodField } from "./fields/packaging";
import { disposableCategoryField, disposableDetailsField } from "./fields/disposables";

export const SubmitOfferForm: TForm = {
	header: "submit_offer",
	intro: "submit_offer_intro",
	fields: [
		withRequired(typeField),
		// Equipment fields
		withRequired(deviceTypeField),
		withRequired(specificationsField),
		equipmentAvailabilityField,
		// Chemicals fields
		withRequired(substanceCategoryField),
		withRequired(substanceDetailsField),
		productProducerField,
		packagingMethodField,
		storageField,
		chemicalsAvailabilityField,
		reasonForAvailabilityField,
		// disposables fields
		withRequired(disposableCategoryField),
		withRequired(disposableDetailsField),
		disposablePackagingField,
		numberField,
		// general fields
		dateAvailableStartField,
		dateAvailableEndField,
		partialUseField,
		contactDetailsField,
		attemptTypeOfferField,
	],
	handler: sendExchangeAttempt,
	matchable: false,
	// infoModal: flowchartModal,
	allowCancel: true,
	splitByRequired: true,
};

export const EditOfferForm: TForm = {
	...SubmitOfferForm,
	handler: null,
	header: "edit_offer",
	intro: "edit_offer_intro",
	infoModal: null,
};

const dateAvailableStartFieldIndex = EditOfferForm.fields.findIndex(
	(f) => f.id === TSpecificationName.DateAvailableStart
);
const dateAvailableEndFieldIndex = EditOfferForm.fields.findIndex(
	(f) => f.id === TSpecificationName.DateAvailableEnd
);
const editOfferAsAdminFields = [...EditOfferForm.fields];
editOfferAsAdminFields[dateAvailableStartFieldIndex] = dateAvailableStartAsAdminField;
editOfferAsAdminFields[dateAvailableEndFieldIndex] = dateAvailableEndAsAdminField;

export const EditOfferAsAdminForm: TForm = {
	...EditOfferForm,
	fields: editOfferAsAdminFields,
};

export const ConfirmOfferMatchForm: TForm = {
	...SubmitOfferForm,
	header: null,
	intro: "confirm_offer_description",
	submitLabel: "confirm",
	matchable: false,
	infoModal: null,
	allowCancel: false,
};

const adminOfferFields = [
	...FilterOffersForm.fields.filter((f) => f.id !== TSpecificationName.DateRequested),
	yearSelectField,
	statusField,
	userFilterField,
	originIdField,
];

export const AdminOffersForm: TForm = {
	...FilterOffersForm,
	fields: adminOfferFields,
	intro: null,
	matchable: false,
	header: null,
	hideSubmit: true,
};
