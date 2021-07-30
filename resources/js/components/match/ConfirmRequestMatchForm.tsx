import React, { useState, useEffect } from "react";
import { TFormField } from "../../typings/Form";
import { createMatchSpecs } from "../../utils/formatting/matches";
import {
	fieldIsNotHidden,
	fieldMeetsDependencies,
	fieldWasFilled
} from "../../utils/filters/fields";
import { Spec } from "./Spec";
import ExchangeAttemptStoreProvider from "../../contexts/SampleContext";
import { ExchangeAttemptStore } from "../../stores/ExchangeAttemptStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { useModalStore } from "../../hooks/useModalStore";
import { BlankButton, Button } from "../base/Button";
import { createOfferMatch } from "../../queries/createOfferMatch";
import { useParams, useHistory } from "react-router-dom";

type Props = {
	fields: TFormField[];
	filters: TFormField[];
	offerId: string;
};

export const ConfirmRequestMatchForm: React.FC<Props> = ({ fields, filters, offerId }) => {
	if (!fields || !filters) {
		return null;
	}
	const [sampleStore] = useState(new ExchangeAttemptStore());
	const { cancel, confirm } = useModalStore();
	const [extraInfo, setExtraInfo] = useState("");
	const [protocolNumber, setProtocolNumber] = useState("");
	const matches = createMatchSpecs(fields, filters);
	const history = useHistory();
	const { t } = useTranslationStore();

	const confirmMatch = async () => {
		const requestData = filters.reduce(
			(base, next) => {
				base[next.id] = next.value;
				return base;
			},
			{ extra_info: extraInfo, protocol_number: protocolNumber }
		);
		await createOfferMatch(requestData, offerId);
		confirm();
		history.push("/app/my-matches?info=true");
	};

	useEffect(() => {
		sampleStore.setFilters(filters);
	}, [filters]);

	return (
		<ExchangeAttemptStoreProvider store={sampleStore}>
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
				<div className="InputField" style={{ maxWidth: "200px", marginBottom: "16px" }}>
					<label style={{ marginBottom: "16px" }}>{t("protocol_number")}</label>
					<input
						type="text"
						value={protocolNumber}
						onChange={e => setProtocolNumber(e.target.value)}
						placeholder={t("work_protocol_number_placeholder")}
					/>
				</div>
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
		</ExchangeAttemptStoreProvider>
	);
};
