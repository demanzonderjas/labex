import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type Props = { value: string; handleClick?: Function };

export const SelectOption: React.FC<Props> = observer(({ value, handleClick }) => {
	const { t } = useTranslationStore();

	return (
		<div className="SelectOption" onClick={handleClick ? () => handleClick() : undefined}>
			{t(value)}
		</div>
	);
});
