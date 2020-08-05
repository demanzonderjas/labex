import { TModal } from "../../typings/Modal";
import { ExchangeOfferMatch } from "../forms/ExchangeOffer";
import { DataList } from "../../components/match/DataList";

export const confirmOfferMatchModal: TModal = {
	form: ExchangeOfferMatch,
	handleConfirm: null
};

export const confirmRequestMatchModal: TModal = {
	header: "confirm_request",
	description: "confirm_request_description",
	Component: DataList,
	props: {},
	handleConfirm: null
};
