import { TUserProfile } from "../../typings/user";
import React from "react";
import { LocalImage } from "../base/Image";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Button } from "../base/Button";
import { organisations } from "../../data/configs/organisations";

export const UserProfile: React.FC<TUserProfile & { hideContact?: boolean }> = ({
	user,
	mine,
	hideContact,
}) => {
	const { t } = useTranslationStore();

	if (!user) {
		return null;
	}

	return (
		<div className="UserProfile user" style={{ display: "flex", alignItems: "center" }}>
			<div className="image-wrapper" style={{ maxWidth: "40px" }}>
				{organisations.some((o) => o == user.organisation) && (
					<LocalImage path={`logo/${user.organisation}_logo.png`} />
				)}
			</div>
			<div className="details inline">
				<span className="name">
					{user.name} {mine ? <>({t("you")})</> : ""}
				</span>
				<br />
				{t(user.organisation)}
				{!hideContact && (
					<div className="margin-10">
						<a href={`mailto:${user.email}`}>
							<Button label="contact_user" classes={{ small: true }} />
						</a>
					</div>
				)}
			</div>
		</div>
	);
};
