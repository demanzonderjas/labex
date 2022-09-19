import React from "react";
import { useTranslationStore } from "../../../../hooks/useTranslationStore";
import { deleteUser } from "../../../../queries/admin/users";
import { ButtonCell } from "../ButtonCell";

export const DeleteUserButtonCell = ({ value, rowIndex, user, ...props }) => {
	const { t } = useTranslationStore();

	const deleteMe = async () => {
		await deleteUser(user);
		location.reload();
	};

	return (
		<ButtonCell {...props} handleClick={deleteMe} label="delete" classes={{ danger: true }} />
	);
};
