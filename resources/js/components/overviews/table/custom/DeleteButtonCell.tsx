import React from "react";
import { confirmDeleteModal } from "../../../../data/modals/confirm";
import { useExchangeAttemptStore } from "../../../../hooks/useExchangeAttemptStore";
import { useModalStore } from "../../../../hooks/useModalStore";
import { deleteAttemptQuery } from "../../../../queries/deleteAttempt";
import { TTableCellProps } from "../../../../typings/overviews";
import { ButtonCell } from "../ButtonCell";

export const DeleteButtonCell: React.FC<TTableCellProps> = ({ value, attempt, ...props }) => {
	const { deleteAttempt, adminView } = useExchangeAttemptStore();
	const { setModal, confirm } = useModalStore();
	const deleteCallback = async () => {
		await deleteAttemptQuery(attempt.id);
		deleteAttempt(attempt.id);
		confirm();
	};

	if (attempt.is_match && !adminView) {
		return <td></td>;
	}

	return (
		<ButtonCell
			{...props}
			handleClick={() =>
				setModal({
					...confirmDeleteModal,
					handleConfirm: deleteCallback
				})
			}
			label="delete"
			classes={{ danger: true }}
		/>
	);
};
