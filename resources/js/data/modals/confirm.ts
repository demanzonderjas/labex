import { TModal } from "../../typings/Modal";
import { ConfirmOfferMatchForm } from "../forms/ExchangeAttemptOffer";
import { ConfirmRequestMatchForm } from "../../components/match/ConfirmRequestMatchForm";

export const confirmOfferMatchModal: TModal = {
	form: ConfirmOfferMatchForm,
	header: "confirm_offer",
	description: "confirm_offer_description",
	handleConfirm: null
};

export const confirmRequestMatchModal: TModal = {
	header: "confirm_request",
	description: "confirm_request_description",
	Component: ConfirmRequestMatchForm,
	props: {},
	handleConfirm: null
};

export const confirmCancelMatchModal: TModal = {
	header: "confirm_cancel_match",
	description: "confirm_cancel_match_description",
	props: {},
	handleConfirm: null,
	isDefault: true
};

export const confirmDeleteModal: TModal = {
	header: "confirm_delete",
	description: "confirm_delete_description",
	props: {},
	handleConfirm: null,
	isDefault: true
};
