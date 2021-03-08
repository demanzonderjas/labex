import { TModal } from "../../typings/Modal";
import { ConfirmOfferMatchForm } from "../forms/ExchangeOffer";
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
