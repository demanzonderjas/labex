import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import cx from "classnames";
import { useFormStore } from "../../hooks/useFormStore";
import { getFieldById } from "../../utils/getters/fields";

type Props = {
	min: number;
	max: number;
	minId: string;
	maxId: string;
};

export const RangeField: React.FC<Props> = observer(({ min, max, minId, maxId }) => {
	const { setFieldValue, fields } = useFormStore();
	const [minWidth, setMinWidth] = useState(0);
	const [maxWidth, setMaxWidth] = useState(100);
	const [isTracking, setIsTracking] = useState(null);
	const minValue = getFieldById(minId, fields);
	const maxValue = getFieldById(maxId, fields);
	const rangeRef = useRef(null);

	const updateMousePos = event => {
		event.preventDefault();
		if (isTracking == "min") {
			updateMinWidth(event.x);
		} else if (isTracking == "max") {
			updateMaxWidth(event.x);
		}
	};

	const updateMinValue = width => {
		const value = ((width / 100) * max) | 0;
		setFieldValue(minId, value);
	};

	const updateMinWidth = xPos => {
		const { left, width } = rangeRef.current.getBoundingClientRect();
		const minPos = Math.max(left, xPos);
		const posDiff = Math.abs(minPos - left);
		const widthPercentage = Math.min((posDiff / width) * 100, maxWidth - 2.5);
		setMinWidth(widthPercentage);
		updateMinValue(widthPercentage);
	};

	const updateMaxValue = width => {
		const value = (((width + minWidth) / 100) * max) | 0;
		setFieldValue(maxId, value - parseInt(minValue.value));
	};

	const updateMaxWidth = xPos => {
		console.log(xPos);
		const { right, width } = rangeRef.current.getBoundingClientRect();
		const maxPos = Math.min(right, xPos);
		const posDiff = right - maxPos;
		const widthPercentage = Math.max(100 - (posDiff / width) * 100, minWidth + 2.5);
		setMaxWidth(widthPercentage);
		updateMaxValue(widthPercentage);
	};

	const loadMinWidthByValue = value => {
		const { left, width } = rangeRef.current.getBoundingClientRect();
		const xOffset = (value / max) * width;
		const xPos = left + xOffset;
		updateMinWidth(xPos);
	};

	const loadMaxWidthByValue = value => {
		const { left, right, width } = rangeRef.current.getBoundingClientRect();
		const xOffset = ((max - value) / max) * width;
		const xPos = right - xOffset;
		const maxPos = Math.min(right, xPos);
		const posDiff = right - maxPos;
		const widthPercentage = Math.max(100 - (posDiff / width) * 100, minWidth + 2.5);
		setMaxWidth(widthPercentage);
	};

	const stopTracking = () => setIsTracking(null);

	useEffect(() => {
		loadMinWidthByValue(parseInt(minValue.value));
		loadMaxWidthByValue(maxValue.value);
	}, []);

	useEffect(() => {
		if (isTracking) {
			window.addEventListener("mouseup", stopTracking);
			window.addEventListener("mousemove", updateMousePos);
		} else {
			return;
		}

		return () => {
			window.removeEventListener("mouseup", stopTracking);
			window.removeEventListener("mousemove", updateMousePos);
			setIsTracking(null);
		};
	}, [isTracking]);

	return (
		<div className="RangeField" ref={rangeRef}>
			<div className="bar">
				<div className="bar-min" style={{ width: `${minWidth}%` }}>
					<div className="indicator-wrapper">
						<div
							className={cx("indicator", { active: isTracking == "min" })}
							onMouseDown={() => setIsTracking("min")}
						/>
						<span className="value">{minValue.value}</span>
					</div>
				</div>
				<div
					className="bar-max"
					style={{ width: `${maxWidth - minWidth}%`, left: `${minWidth}%` }}
				>
					<div className="indicator-wrapper">
						<div
							className={cx("indicator", { active: isTracking == "max" })}
							onMouseDown={() => setIsTracking("max")}
						/>
						<span className="value">{maxValue.value}</span>
					</div>
				</div>
			</div>
		</div>
	);
});
