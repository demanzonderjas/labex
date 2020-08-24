import { TModal } from "../../typings/Modal";
import { MoreInfo } from "../../components/dashboard/MoreInfo";

export const moreDashboardInfoModal: TModal = {
	header: "More info",
	description: "more_info_dashboard_description",
	Component: MoreInfo,
	handleConfirm: null
};
