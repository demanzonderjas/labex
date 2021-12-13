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
import { adoptionField } from "./fields/adoption";
import { locationField } from "./fields/location";
import { dateAvailableEndField, dateAvailableStartField } from "./fields/dateAvailable";

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
	allowCancel: true
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
