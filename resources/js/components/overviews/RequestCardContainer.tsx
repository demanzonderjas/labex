import React from "react";
import { RequestCard } from "./RequestCard";
import { TTableCell } from "../../typings/overviews";

type Props = {
	matches: TTableCell[][];
};

export const RequestCardContainer: React.FC<Props> = ({ matches }) => {
	return (
		<div className="OfferCardContainer card-container">
			{matches.map((data, idx) => (
				<RequestCard key={idx} data={data} index={idx} />
			))}
		</div>
	);
};
