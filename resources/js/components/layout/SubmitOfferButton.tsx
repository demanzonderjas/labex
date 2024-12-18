import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../base/Button";
import { useUserStore } from "../../hooks/useUserStore";
import { observer } from "mobx-react-lite";

export const SubmitOfferButton = observer(() => {
	const navigate = useNavigate();
	const { userCanAddContent } = useUserStore();

	if (!userCanAddContent) return null;

	return (
		<div className="SubmitOfferButton inline">
			<Button
				label="submit_offer"
				handleClick={() => navigate("/app/submit-offer")}
				classes={{ small: true }}
			/>
		</div>
	);
});
