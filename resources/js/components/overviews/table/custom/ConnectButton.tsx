import React from "react";
import { useModalStore } from "../../../../hooks/useModalStore";
import { TTableCellProps } from "../../../../typings/overviews";
import { ButtonCell } from "../ButtonCell";
import { useHistory } from "react-router-dom";
import { connectMatch } from "../../../../queries/createMatch";

export const ConnectButtonCell: React.FC<TTableCellProps> = ({ attempt, ...props }) => {
	const { confirm, modal } = useModalStore();
	const history = useHistory();

	const confirmMatch = async () => {
		console.log("connect", attempt.id, modal.props.offerId);
		await connectMatch(attempt.id, modal.props.offerId);
		confirm();
		history.push("/app/my-matches?info=true");
	};

	return <ButtonCell {...props} handleClick={confirmMatch} label="connect" classes={{ tertiary: true }} />;
};
