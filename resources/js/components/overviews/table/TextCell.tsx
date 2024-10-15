import React from "react";
import { useTranslationStore } from "../../../hooks/useTranslationStore";

type Props = {
	value: string;
};

export const TextCell: React.FC<Props> = ({ value }) => {
	const { t } = useTranslationStore();
	return <td>{value ? t(value) : "n/a"}</td>;
};

export const DescriptionCell: React.FC<Props> = ({ value }) => {
	const { t } = useTranslationStore();
	return <td style={{ minWidth: "240px" }}>{value ? t(value) : "n/a"}</td>;
};
