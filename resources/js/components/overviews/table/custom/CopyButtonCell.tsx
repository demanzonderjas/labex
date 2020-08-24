import React from "react";
import { ButtonCell } from "../ButtonCell";
import { useSampleStore } from "../../../../hooks/useSampleStore";
import { MatchType } from "../../../../typings/Overview";
import { useHistory } from "react-router-dom";
import { createQueryStringFromSample } from "../../../../utils/formatting/samples";

export const CopyButtonCell = ({ value, rowIndex, sample, ...props }) => {
	const sampleType = !!sample.date_available ? "offer" : "request";
	const history = useHistory();

	const copy = () => {
		const queryString = createQueryStringFromSample(sample);
		history.push(`/app/submit-${sampleType}${queryString}`);
	};

	return <ButtonCell {...props} handleClick={copy} label="copy" classes={{ primary: true }} />;
};
