import { TForm } from "../../typings/forms";
import { storageField } from "./fields/storage";
import { deviceTypeField, typeField } from "./fields/type";
import { contactDetailsField, specificationsField } from "./fields/extraInfo";
import { withRequired } from "../../utils/formatting/fields";
import { sendExchangeAttempt } from "../../queries/sendExchangeAttempt";
import { attemptTypeOfferField } from "./fields/attemptType";
import {
	dateAvailableEndAsAdminField,
	dateAvailableEndField,
	dateAvailableStartAsAdminField,
	dateAvailableStartField,
	expiryDateField,
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
import { originIdField } from "./fields/origin";
import { amountField, volumeWeightField } from "./fields/amount";
import { descriptionField, titleField } from "./fields/info";
import { locationBuildingField, locationRoomField } from "./fields/location";
import { imageField } from "./fields/image";
import { ageField } from "./fields/age";

export const SubmitOfferForm: TForm = {
	header: "submit_offer",
	intro: "submit_offer_intro",
	fields: [
		titleField,
		descriptionField,
		imageField,
		withRequired(typeField),
		// Equipment fields
		withRequired(deviceTypeField),
		withRequired(specificationsField),
		withRequired(ageField),
		equipmentAvailabilityField,
		// Chemicals fields
		withRequired(substanceCategoryField),
		withRequired(substanceDetailsField),
		withRequired(volumeWeightField),
		productProducerField,
		packagingMethodField,
		storageField,
		chemicalsAvailabilityField,
		reasonForAvailabilityField,
		// disposables fields
		withRequired(disposableCategoryField),
		withRequired(disposableDetailsField),
		withRequired(expiryDateField),
		disposablePackagingField,
		numberField,
		// general fields
		withRequired(amountField),
		dateAvailableStartField,
		dateAvailableEndField,
		partialUseField,
		contactDetailsField,
		attemptTypeOfferField,
		locationBuildingField,
		locationRoomField,
	],
	handler: sendExchangeAttempt,
	matchable: false,
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
