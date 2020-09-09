import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type Props = {
	header: string;
};

export const PageIntro: React.FC<Props> = ({ header, children }) => {
	const { t } = useTranslationStore();
	return (
		<div className="PageIntro">
			<div className="layout-wrapper">
				<h1>{t(header)}</h1>
				{children}
			</div>
		</div>
	);
};

export const TwoColumnPageIntro: React.FC<{ header: string; subheader: string }> = ({
	header,
	subheader,
	children
}) => {
	const { t } = useTranslationStore();
	return (
		<div className="TwoColumnPageIntro PageIntro">
			<div className="layout-wrapper">
				<div className="column">
					<div className="content">
						<h1>{t(header)}</h1>
						<p>{t(subheader)}</p>
					</div>
				</div>
				<div className="column">
					<div className="content">{children}</div>
				</div>
			</div>
		</div>
	);
};
