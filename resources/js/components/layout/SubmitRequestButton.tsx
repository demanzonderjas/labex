import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../base/Button";

export function SubmitRequestButton() {
	const navigate = useNavigate();
	return (
		<div className="SubmitRequestButton inline">
			<Button
				label="submit_request"
				handleClick={() => navigate("/app/submit-request")}
				classes={{ small: true }}
			/>
		</div>
	);
}
