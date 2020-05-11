import React from "react";
import { env } from "../../env";

type Props = {
	path: string;
};

export const LocalImage: React.FC<Props> = ({ path }) => {
	return <img className="LocalImage" src={`${env.baseUrl}/images/${path}`} />;
};
