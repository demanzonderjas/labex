import React from "react";
import { env } from "../../env";

type Props = {
	path: string;
	maxHeight?: string;
};

export const LocalImage: React.FC<Props> = ({ path, maxHeight = "100%" }) => {
	return (
		<img
			style={{ maxHeight, maxWidth: "100%" }}
			className="LocalImage"
			src={`${env.baseUrl}/images/${path}`}
		/>
	);
};

export const UploadedImage: React.FC<Props> = ({ path, maxHeight = "100%" }) => {
	return (
		<img
			style={{ maxHeight, maxWidth: "100%" }}
			className="UploadedImage"
			src={`${env.baseUrl}/storage/${path}`}
		/>
	);
};

type IconProps = {
	name: string;
};

export const Icon: React.FC<IconProps> = ({ name }) => {
	return <LocalImage path={`icons/${name}.svg`} />;
};
