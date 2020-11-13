import { TUser, TUserProfile } from "../../typings/User";
import React from "react";
import { LocalImage } from "../base/Image";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const UserProfile: React.FC<TUserProfile> = ({ user, mine }) => {
	const { t } = useTranslationStore();

	return (
		<div className="UserProfile user">
			<LocalImage path={`logo/${user.organisation}_logo.png`} />
			<div className="details inline">
				<span className="name">
					{user.name} {mine ? <>({t("you")})</> : ""}
				</span>
				<br />
				{t(user.organisation)}
			</div>
		</div>
	);
};
