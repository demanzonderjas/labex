import { TForm } from "../../typings/forms";
import { sendExchangeAttempt } from "../../queries/sendExchangeAttempt";
import { storageField } from "./fields/storage";
import { deviceTypeField, typeField } from "./fields/type";
import { flowchartModal } from "../modals/flowchart";
import { attemptTypeRequestField } from "./fields/attemptType";
import { withRequired } from "../../utils/formatting/fields";
import {
	chemicalsAvailabilityField,
	equipmentAvailabilityField,
	reasonForAvailabilityField,
} from "./fields/availability";
import { substanceCategoryField } from "./fields/substance";
import { disposablePackagingField, packagingMethodField } from "./fields/packaging";
import { disposableCategoryField } from "./fields/disposables";
import { dateRequestedField } from "./fields/dateAvailable";
import { amountField, volumeWeightField } from "./fields/amount";
import { descriptionField, titleField } from "./fields/info";
import { extraInfoField } from "./fields/extraInfo";

export const FilterOffersForm: TForm = {
	header: "offers",
	intro: "offers_intro",
	submitLabel: "submit_my_request",
	fields: [
		withRequired(typeField),
		titleField,
		descriptionField,
		// Equipment fields
		withRequired(deviceTypeField),
		equipmentAvailabilityField,
		// Chemicals fields
		substanceCategoryField,
		packagingMethodField,
		storageField,
		chemicalsAvailabilityField,
		reasonForAvailabilityField,
		volumeWeightField,
		// disposables fields
		disposableCategoryField,
		disposablePackagingField,
		// general fields
		amountField,
		dateRequestedField,
		attemptTypeRequestField,
	],
	handler: sendExchangeAttempt,
	matchable: true,
	infoModal: flowchartModal,
};

export const RequestSpecificationsForm: TForm = {
	...FilterOffersForm,
	header: "requests",
	intro: "requests_intro",
	submitLabel: "submit_my_offer",
	hideSubmit: false,
};

export const FilterRequestsForm: TForm = {
	...FilterOffersForm,
	header: "requests",
	intro: "requests_intro",
	submitLabel: "submit_my_offer",
	hideSubmit: false,
};

export const RequestMatchCardFields: TForm = {
	...FilterOffersForm,
	fields: [...FilterOffersForm.fields, extraInfoField],
};

export const SubmitRequestForm: TForm = {
	...FilterOffersForm,
	matchable: false,
	header: "submit_request",
	intro: "submit_request_description",
	submitLabel: "submit",
	allowCancel: true,
};

export const EditRequestForm: TForm = {
	...SubmitRequestForm,
	header: "edit_request",
	intro: "edit_request_description",
};
