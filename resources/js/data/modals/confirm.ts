import { TModal } from "../../typings/Modal";
import { ExchangeOfferMatch } from "../forms/ExchangeOffer";
import { ExchangeRequestMatch } from "../forms/ExchangeRequest";

export const confirmOfferMatchModal: TModal = {
	form: ExchangeOfferMatch,
	handleConfirm: null
};

export const confirmRequestMatchModal: TModal = {
	form: ExchangeRequestMatch,
	handleConfirm: null
};
