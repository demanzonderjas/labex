import React from "react";
import { useTranslationStore } from "../../../../hooks/useTranslationStore";
import { deleteSignup } from "../../../../queries/admin/updateSignups";
import { ButtonCell } from "../ButtonCell";

export const DeleteSignupButtonCell = ({ value, rowIndex, signup, ...props }) => {
	const { t } = useTranslationStore();

	const deleteMe = async () => {
		await deleteSignup(signup);
		// location.reload();
	};

	return (
		<ButtonCell {...props} handleClick={deleteMe} label="delete" classes={{ danger: true }} />
	);
};
