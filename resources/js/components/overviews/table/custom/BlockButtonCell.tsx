import React from "react";
import { useTranslationStore } from "../../../../hooks/useTranslationStore";
import { declineSignup } from "../../../../queries/admin/updateSignups";
import { ButtonCell } from "../ButtonCell";
import { TextCell } from "../TextCell";

export const BlockButtonCell = ({ value, rowIndex, signup, ...props }) => {
	const { t } = useTranslationStore();
	
	const decline = async () => {
        await declineSignup(signup);
        location.reload();
    };
    
    if(!signup.approved && !signup.awaiting_approval) {
        return <TextCell value="-" />
    }

	return (
		<ButtonCell
			{...props}
			handleClick={decline}
			label="block"
			classes={{ danger: true }}
		/>
	);
};
