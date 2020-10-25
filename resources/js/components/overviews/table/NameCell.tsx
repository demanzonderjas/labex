import React from "react";
import { useTranslationStore } from "../../../hooks/useTranslationStore";

type Props = {
	value: string;
};

export const NameCell: React.FC<Props> = ({ value }) => {
	const { t } = useTranslationStore();
	return <td style={{ minWidth: "400px" }}>{value ? t(value) : "n/a"}</td>;
};
