import React from "react";
import { TTableCell } from "../../typings/overviews";
import { OfferCard } from "./OfferCard";

type Props = {
	matches: TTableCell[][];
};

export const OfferCardContainer: React.FC<Props> = ({ matches }) => {
	return (
		<div className="OfferCardContainer card-container">
			{matches.map((data, idx) => (
				<OfferCard key={idx} data={data} index={idx} />
			))}
		</div>
	);
};
