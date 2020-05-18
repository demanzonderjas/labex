import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type Props = { value: string };

export const SelectOption: React.FC<Props> = observer(({ value }) => {
	const { t } = useTranslationStore();

	return <option value={value}>{t(value)}</option>;
});
