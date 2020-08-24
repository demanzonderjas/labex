import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../base/Button";

export function SubmitRequestButton() {
	const history = useHistory();
	return (
		<div className="SubmitRequestButton inline">
			<Button
				label="submit_request"
				handleClick={() => history.push("/app/submit-request")}
				classes={{ small: true }}
			/>
		</div>
	);
}
