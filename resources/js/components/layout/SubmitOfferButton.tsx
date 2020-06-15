import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../base/Button";

export function SubmitOfferButton() {
	const history = useHistory();
	return (
		<div className="SubmitOfferButton">
			<Button label="submit_offer" handleClick={() => history.push("/app/submit-offer")} />
		</div>
	);
}
