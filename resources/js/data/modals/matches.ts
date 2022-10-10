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
