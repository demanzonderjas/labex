import React from "react";
import { LocalImage } from "../base/Image";
import { FormField } from "../../typings/Form";
import { TUser } from "../../typings/User";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { MatchType } from "../../typings/Overview";
import { MatchValue } from "./MatchValue";
import { SpecStatus } from "../../typings/Sample";
import {
	fieldIsNotHidden,
	fieldWasFilled,
	fieldMeetsDependencies
} from "../../utils/filters/fields";
import cx from "classnames";

type Props = {
	mine: boolean;
	specs: FormField[];
	user: TUser;
	matchType: MatchType;
};

export const MatchCard: React.FC<Props> = ({ mine, user, specs, matchType }) => {
	const { t } = useTranslationStore();
	return (
		<div className="MatchCard">
			<div className="header">
				<div className="user">
					<LocalImage path={`logo/${user.organisation}_logo.png`} />
					<div className="details inline">
						<span className="name">
							{user.name} {mine ? <>({t("you")})</> : ""}
						</span>
						<br />
						{t(user.organisation)}
					</div>
				</div>
				<div className={cx("match-label", { mine })}>
					{mine && <span>{t(`${matchType}_by_you`)}</span>}
				</div>
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
							/>
						</div>
					))}
			</div>
		</div>
	);
};
