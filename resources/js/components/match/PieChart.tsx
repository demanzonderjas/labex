import React, { useRef, useEffect } from "react";
import Chart from "chart.js";
import { useTranslationStore } from "../../hooks/useTranslationStore";

type Props = {
	percentages: number[];
	colors: string[];
	labels?: string[];
};

export const PieChart: React.FC<Props> = ({ percentages, colors, labels }) => {
	const canvasRef = useRef(null);
	const { t } = useTranslationStore();

	console.log(percentages);

	useEffect(() => {
		const ctx = canvasRef.current.getContext("2d");
		new Chart(ctx, {
			type: "doughnut",
			data: {
				datasets: [
					{
						borderWidth: 0,
						data: percentages,
						backgroundColor: colors
					}
				],
				labels: labels ? labels.map(label => t(label)) : null
			},
			options: {
				cutoutPercentage: 75,
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
