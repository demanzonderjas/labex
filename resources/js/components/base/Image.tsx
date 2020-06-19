import React from "react";
import { env } from "../../env";

type Props = {
	path: string;
};

export const LocalImage: React.FC<Props> = ({ path }) => {
	return <img className="LocalImage" src={`${env.baseUrl}/images/${path}`} />;
};

type IconProps = {
	name: string;
};

export const Icon: React.FC<IconProps> = ({ name }) => {
	return <LocalImage path={`icons/${name}.svg`} />;
};
