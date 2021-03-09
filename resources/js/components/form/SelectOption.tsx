import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Icon } from "../base/Image";

type Props = { value: string; handleClick?: Function; isSelected?: boolean };

export const SelectOption: React.FC<Props> = observer(({ value, handleClick, isSelected }) => {
	const { t } = useTranslationStore();

	return (
		<div className="SelectOption" onClick={handleClick ? () => handleClick() : undefined}>
			<span>{t(value)}</span>
			{isSelected && (
				<div className="image-wrapper">
					<Icon name="check" />
				</div>
			)}
		</div>
	);
});
