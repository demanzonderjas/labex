import React, { useRef, useEffect } from "react";
import Chart from "chart.js";
import { MATCH_CHART_COLORS } from "../../data/configs/colors";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type Props = {
	percentages: number[];
};

export const PieChart: React.FC<Props> = ({ percentages }) => {
	const canvasRef = useRef(null);
	const { t } = useTranslationStore();

	useEffect(() => {
		const ctx = canvasRef.current.getContext("2d");
		new Chart(ctx, {
			type: "doughnut",
			data: {
				datasets: [
					{
						borderWidth: 0,
						data: percentages,
						backgroundColor: MATCH_CHART_COLORS
					}
				]
			},
			options: {
				tooltips: {
					enabled: false
				},
				events: []
			}
		});
	}, [percentages]);

	return (
		<div className="PieChart">
			<canvas ref={canvasRef} width="220" height="220"></canvas>
		</div>
	);
};
