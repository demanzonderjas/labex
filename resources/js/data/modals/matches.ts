import { ConnectMatchForm } from "../../components/match/ConnectMatchForm";
import { ApproveMatchModal } from "../../components/modals/ApproveMatch";
import { MatchesModal } from "../../components/modals/Matches";
import { RejectMatchModal } from "../../components/modals/RejectMatch";
import { TModal } from "../../typings/modals";

export const matchesModal: TModal = {
	header: "what_happens_now",
	description: null,
	Component: MatchesModal,
	handleConfirm: null,
	align: "center"
};

export const rejectMatchModal: TModal = {
	header: "reject_match",
	description: "reject_match_description",
	Component: RejectMatchModal,
	props: {},
	handleConfirm: null
};

export const approveMatchModal: TModal = {
	header: "approve_match_label",
	description: "approve_match_description",
	Component: ApproveMatchModal,
	props: {},
	handleConfirm: null
};

export const connectRequestMatchModal: TModal = {
	header: "connect_request",
	description: "connect_request_description",
	Component: ConnectMatchForm,
	props: {},
	handleConfirm: null
};

export const connectOfferMatchModal: TModal = {
	header: "connect_offer",
	description: "connect_offer_description",
	Component: ConnectMatchForm,
	props: {},
	handleConfirm: null
};
