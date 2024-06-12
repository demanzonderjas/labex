import React from "react";
import { env } from "../../env";

type Props = {
	path: string;
};

export const LocalImage: React.FC<Props> = ({ path }) => {
	return (
		<img
			style={{ maxHeight: "100%", maxWidth: "100%" }}
			className="LocalImage"
			src={`${env.baseUrl}/images/${path}`}
		/>
	);
};

export const UploadedImage: React.FC<Props> = ({ path }) => {
	return (
		<img
			style={{ maxHeight: "100%", maxWidth: "100%" }}
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
