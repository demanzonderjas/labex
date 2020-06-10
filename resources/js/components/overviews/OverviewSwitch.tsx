import React from "react";
import { LocalImage } from "../base/Image";
import { useSampleStore } from "../../hooks/useSampleStore";
import { OverviewType } from "../../typings/Overview";

export const OverviewSwitch: React.FC = () => {
	const { setOverviewType } = useSampleStore();
	return (
		<div className="OverviewSwitch">
			<div className="image-wrapper" onClick={() => setOverviewType(OverviewType.Cards)}>
				<LocalImage path="icons/cards-overview.svg" />
			</div>
			<div className="image-wrapper" onClick={() => setOverviewType(OverviewType.Table)}>
				<LocalImage path="icons/table-overview.svg" />
			</div>
		</div>
	);
};
