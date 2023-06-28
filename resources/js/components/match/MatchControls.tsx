import React, { MouseEventHandler } from "react";
import { Icon } from "../base/Image";
import { SecondaryButton, TertiaryButton } from "../base/Button";

export const MatchControls: React.FC<{
	handleBack: MouseEventHandler;
	handleSelect: MouseEventHandler;
	handleConnect: MouseEventHandler;
}> = ({ handleBack, handleSelect, handleConnect }) => {
	return (
		<div className="MatchControls layout-wrapper" style={{ display: "flex", justifyContent: "space-between", margin: "20px auto" }}>
			<div className="inline" onClick={handleBack} style={{ cursor: "pointer" }}>
				<Icon name="back" />
			</div>
			<SecondaryButton label="select_match" handleClick={handleSelect} />
			<TertiaryButton label="connect_to_existing" handleClick={handleConnect} />
		</div>
	);
};
