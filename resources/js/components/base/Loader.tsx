import React from "react";
import { LocalImage } from "./Image";

type Props = {
	isLoading: boolean;
};

export const Loader: React.FC<Props> = ({ isLoading }) => {
	if (!isLoading) {
		return null;
	}
	return (
		<div className="Loader">
			<LocalImage path="loader.svg" />
		</div>
	);
};
