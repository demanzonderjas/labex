import React, { useState, useEffect } from "react";
import { FormField } from "../../typings/Form";
import { createMatchSpecs } from "../../utils/formatting/matches";
import {
	fieldIsNotHidden,
	fieldMeetsDependencies,
	fieldWasFilled
} from "../../utils/filters/fields";
import { Spec } from "./Spec";
import SampleStoreProvider from "../../contexts/SampleContext";
import { SampleStore } from "../../stores/SampleStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { useModalStore } from "../../hooks/useModalStore";
import { BlankButton, Button } from "../base/Button";
import { createOfferMatch } from "../../queries/createOfferMatch";
import { useParams } from "react-router-dom";

type Props = {
	fields: FormField[];
	filters: FormField[];
	offerId: string;
};

export const DataList: React.FC<Props> = ({ fields, filters, offerId }) => {
	if (!fields || !filters) {
		return null;
	}
	const [sampleStore] = useState(new SampleStore());
	const { cancel, confirm } = useModalStore();
	const [extraInfo, setExtraInfo] = useState("");
	const matches = createMatchSpecs(fields, filters);
	const { t } = useTranslationStore();

	const confirmMatch = () => {
		const requestData = filters.reduce(
			(base, next) => {
				base[next.id] = next.value;
				return base;
			},
			{ extra_info: extraInfo }
		);
		createOfferMatch(requestData, offerId);
		confirm();
	};

	useEffect(() => {
		sampleStore.setFilters(filters);
	}, [filters]);

	return (
		<SampleStoreProvider store={sampleStore}>
			<div className="DataList layout-wrapper">
				{matches
					.filter(fieldIsNotHidden)
					.filter(fieldMeetsDependencies)
					.filter(fieldWasFilled)
					.map(match => (
						<Spec key={match.id} {...match} fields={fields} />
					))}
			</div>
			<div className="extra-info">
				<label>{t("extra_info")}</label>
				<div className="BigTextField">
					<textarea
						value={extraInfo}
						onChange={e => setExtraInfo(e.target.value)}
						placeholder={t("extra_information_placeholder")}
					/>
				</div>
				<div className="buttons layout-wrapper">
					<BlankButton label="cancel" handleClick={cancel} classes={{ inline: true }} />
					<Button
						label="confirm"
						handleClick={confirmMatch}
						classes={{ inline: true, secondary: true }}
					/>
				</div>
			</div>
		</SampleStoreProvider>
	);
};
