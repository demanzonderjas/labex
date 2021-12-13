import { TUserProfile } from "../../typings/user";
import React from "react";
import { LocalImage } from "../base/Image";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Button } from "../base/Button";

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
				<div className="margin-10">
					<a href={`mailto:${user.email}`}>
						<Button label="contact_user" classes={{ small: true }} />
					</a>
				</div>
			</div>
		</div>
	);
};
