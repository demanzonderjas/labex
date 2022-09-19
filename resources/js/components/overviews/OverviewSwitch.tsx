import React from "react";
import { LocalImage } from "../base/Image";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { TOverviewType } from "../../typings/overviews";

export const OverviewSwitch: React.FC = () => {
	const { setOverviewType } = useExchangeAttemptStore();
	return (
		<div className="OverviewSwitch">
			<div className="image-wrapper" onClick={() => setOverviewType(TOverviewType.Table)}>
				<LocalImage path="icons/table-overview.svg" />
			</div>
			<div className="image-wrapper" onClick={() => setOverviewType(TOverviewType.Cards)}>
				<LocalImage path="icons/cards-overview.svg" />
			</div>
		</div>
	);
};
