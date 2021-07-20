import React from "react";
import { LocalImage } from "../base/Image";
import { FormField } from "../../typings/Form";
import { TUser } from "../../typings/User";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { MatchType } from "../../typings/Overview";
import { MatchValue } from "./MatchValue";
import { TSpecStatus } from "../../typings/Sample";
import {
	fieldIsNotHidden,
	fieldWasFilled,
	fieldMeetsDependencies,
	fieldShouldBeIgnoredInMatch
} from "../../utils/filters/fields";
import cx from "classnames";
import { UserProfile } from "./UserProfile";

type Props = {
	mine: boolean;
	specs: FormField[];
	user: TUser;
	matchType: MatchType;
	status?: string;
};

export const MatchCard: React.FC<Props> = ({ mine, user, specs, matchType, status }) => {
	const { t } = useTranslationStore();
	return (
		<div className="MatchCard">
			<div className="header">
				<UserProfile user={user} mine={mine} />
				{matchType != MatchType.Admin && (
					<div className={cx("match-label", { mine, [status]: true, [matchType]: mine })}>
						{mine && <span>{t(`${matchType}_by_you`)}</span>}
						{!mine && status && <span>{t(`${status}_label`)}</span>}
					</div>
				)}
			</div>
			<div className="specs">
				{specs
					.filter(fieldIsNotHidden)
					.filter(f => f.value != "")
					.filter(fieldMeetsDependencies)
					.map(spec => (
						<div className="spec" key={spec.id}>
							<label>{t(spec.label)}</label>
							<MatchValue
								matchStatus={spec.match.status}
								value={spec.value}
								specs={specs}
								label={spec.label}
								neutral={fieldShouldBeIgnoredInMatch(spec)}
							/>
						</div>
					))}
			</div>
		</div>
	);
};
