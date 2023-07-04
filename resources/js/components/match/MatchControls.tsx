import React, { MouseEventHandler } from "react";
import { Icon } from "../base/Image";
import { SecondaryButton, TertiaryButton } from "../base/Button";
import { TExchangeAttemptType } from "../../typings/exchanges";

export const MatchControls: React.FC<{
	handleBack: MouseEventHandler;
	handleSelect: MouseEventHandler;
	handleConnect: MouseEventHandler;
	connectType: TExchangeAttemptType;
}> = ({ handleBack, handleSelect, handleConnect, connectType }) => {
	return (
		<div className="MatchControls layout-wrapper" style={{ display: "flex", justifyContent: "space-between", margin: "20px auto" }}>
			<div className="inline" onClick={handleBack} style={{ cursor: "pointer" }}>
				<Icon name="back" />
			</div>
			<SecondaryButton label="select_match" handleClick={handleSelect} />
			<TertiaryButton label={`connect_to_${connectType}`} handleClick={handleConnect} />
		</div>
	);
};
