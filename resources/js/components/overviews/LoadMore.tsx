import React from "react";
import { useSampleStore } from "../../hooks/useSampleStore";
import { SecondaryButton } from "../base/Button";

export const LoadMore: React.FC = () => {
	const { upgradeLimit } = useSampleStore();

	return (
		<div className="LoadMore button-wrapper">
			<SecondaryButton label="load_more" handleClick={() => upgradeLimit()} />
		</div>
	);
};
