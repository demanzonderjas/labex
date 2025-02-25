import React from "react";
import { useTranslationStore } from "../../../../hooks/useTranslationStore";
import { deleteUser } from "../../../../queries/admin/users";
import { ButtonCell } from "../ButtonCell";

export const DeleteUserButtonCell = ({ value, rowIndex, userId, ...props }) => {
	const { t } = useTranslationStore();

	const deleteMe = async () => {
		await deleteUser(userId);
		location.reload();
	};

	return (
		<ButtonCell {...props} handleClick={deleteMe} label="delete" classes={{ danger: true }} />
	);
};
