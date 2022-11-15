import React from "react";
import { TFormField, TFormFieldName } from "../../typings/forms";
import { TUser } from "../../typings/user";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { MatchType } from "../../typings/overviews";
import { MatchValue } from "./MatchValue";
import {
	fieldIsNotHidden,
	fieldMeetsDependencies,
	fieldShouldBeIgnoredInMatch
} from "../../utils/filters/fields";
import cx from "classnames";
import { UserProfile } from "./UserProfile";
import { TSpecificationName } from "../../typings/exchanges";

type Props = {
	mine: boolean;
	specs: TFormField[];
	user: TUser;
	matchType: MatchType;
	status?: string;
};

export const MatchCard: React.FC<Props> = ({ mine, user, specs, matchType, status }) => {
	const { t } = useTranslationStore();
	return (
		<div className="MatchCard">
			<div className="header">
				<UserProfile user={user} mine={mine} hideContact={true} />
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
						<div
							className={cx("spec", {
								full_width: spec.label === TSpecificationName.ExtraInfo
							})}
							key={spec.id}
						>
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
