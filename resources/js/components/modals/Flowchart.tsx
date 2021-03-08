import React from "react";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { LocalImage } from "../base/Image";

export function FlowChart() {
	const { t } = useTranslationStore();
	return (
		<>
			<p>{t("flowchart_intro")}</p>
			<div style={{ margin: "40px 0" }}>
				<LocalImage path="info/flowchart.jpg" />
			</div>
		</>
	);
}
