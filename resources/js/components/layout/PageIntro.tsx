import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import cx from "classnames";
import { TotalMatchesFound } from "../form/TotalMatchesFound";
import { HeaderIcon } from "../icons/HeaderIcons";

type Props = {
	header: string;
	paddingLeft?: number;
	boldHeader?: boolean;
};

export const PageIntro: React.FC<Props> = ({
	header,
	children,
	paddingLeft = 0,
	boldHeader = false
}) => {
	const { t } = useTranslationStore();
	return (
		<div className="PageIntro">
			<div className="layout-wrapper" style={{ paddingLeft: `${paddingLeft}px` }}>
				<h1 className={cx({ bold: boldHeader })}>{t(header)}</h1>
				{children}
			</div>
		</div>
	);
};

export const TwoColumnPageIntro: React.FC<{
	header: string;
	subheader: string;
	matchable?: boolean;
}> = ({ header, subheader, matchable, children }) => {
	const { t } = useTranslationStore();
	return (
		<div className="TwoColumnPageIntro PageIntro">
			<div className="layout-wrapper">
				<div className="column">
					<div className="content">
						<div className="icon">
							<HeaderIcon type={header} />
						</div>
						<div className="title">
							<h1>{t(header)}</h1>
							<div>
								<p>{t(subheader)}</p>
								{!!matchable && <TotalMatchesFound />}
							</div>
						</div>
					</div>
				</div>
				<div className="column">
					<div className="content">{children}</div>
				</div>
			</div>
		</div>
	);
};
