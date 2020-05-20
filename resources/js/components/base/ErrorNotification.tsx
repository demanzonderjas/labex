import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type Props = {
	error: string;
};

export const ErrorNotification: React.FC<Props> = ({ error }) => {
	const { t } = useTranslationStore();
	if (!error) {
		return null;
	}

	return (
		<div className="ErrorNotification">
			<div className="message-wrapper">
				<p>{t(error)}</p>
			</div>
		</div>
	);
};
