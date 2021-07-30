import React from "react";
import { useExchangeAttemptStore } from "../../hooks/useExchangeAttemptStore";
import { SecondaryButton } from "../base/Button";

export const LoadMore: React.FC = () => {
	const { upgradeLimit } = useExchangeAttemptStore();

	return (
		<div className="LoadMore">
			<SecondaryButton label="load_more" handleClick={() => upgradeLimit()} />
		</div>
	);
};
