import React from "react";
import { useTranslationStore } from "../../../hooks/useTranslationStore";
import { LocalImage } from "../../base/Image";

type Props = {
	handleActivate: Function;
};

export const OtherOption: React.FC<Props> = ({ handleActivate }) => {
	const { t } = useTranslationStore();
	return (
		<div className="SelectOption" onClick={() => handleActivate()}>
			{t("other")}
			<div className="image-wrapper">
				<LocalImage path="icons/plus.svg" />
			</div>
		</div>
	);
};
