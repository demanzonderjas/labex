import React from "react";
import { useTranslationStore } from "../../../../hooks/useTranslationStore";
import { approveSignup } from "../../../../queries/admin/updateSignups";
import { ButtonCell } from "../ButtonCell";
import { TextCell } from "../TextCell";

export const ApproveButtonCell = ({ value, rowIndex, signup, ...props }) => {
	const { t } = useTranslationStore();
	const approve = async () => {
		await approveSignup(signup);
		location.reload();
	};

	if (!signup.awaiting_approval) {
		return <TextCell value="-" />;
	}

	return (
		<ButtonCell {...props} handleClick={approve} label="approve" classes={{ confirm: true }} />
	);
};
