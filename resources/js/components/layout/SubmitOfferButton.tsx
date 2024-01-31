import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../base/Button";

export function SubmitOfferButton() {
	const navigate = useNavigate();
	return (
		<div className="SubmitOfferButton inline">
			<Button
				label="submit_offer"
				handleClick={() => navigate("/app/submit-offer")}
				classes={{ small: true }}
			/>
		</div>
	);
}
