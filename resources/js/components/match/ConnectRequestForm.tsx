import React, { useState, useEffect } from "react";
import { TFormField } from "../../typings/forms";
import { createMatchSpecs } from "../../utils/formatting/matches";
import { fieldIsNotHidden, fieldMeetsDependencies, fieldWasFilled } from "../../utils/filters/fields";
import { Spec } from "./Spec";
import ExchangeAttemptStoreProvider from "../../contexts/ExchangeAttemptContext";
import { ExchangeAttemptStore } from "../../stores/ExchangeAttemptStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { useModalStore } from "../../hooks/useModalStore";
import { BlankButton, Button } from "../base/Button";
import { createMatch } from "../../queries/createMatch";
import { useHistory } from "react-router-dom";
import { TSpecificationName } from "../../typings/exchanges";

type Props = {
	fields: TFormField[];
	filters: TFormField[];
	offerId: string;
};

export const ConnectRequestForm: React.FC<Props> = ({ fields, filters, offerId }) => {
	if (!fields || !filters) {
		return null;
	}
	const [sampleStore] = useState(new ExchangeAttemptStore());
	const { cancel, confirm } = useModalStore();
	const [extraInfo, setExtraInfo] = useState("");
	const [protocolNumber, setProtocolNumber] = useState("");
	const [hasNumberError, setNumberError] = useState(false);
	const [amount, setAmount] = useState(filters.find(f => f.id === TSpecificationName.Amount)?.value);
	const matches = createMatchSpecs(fields, filters);
	const history = useHistory();
	const { t } = useTranslationStore();

	const confirmMatch = async () => {
		if (!protocolNumber) {
			setNumberError(true);
			return;
		}
		const requestData: any = filters.reduce(
			(base, next) => {
				base[next.id] = next.value;
				return base;
			},
			{ extra_info: extraInfo, protocol_number: protocolNumber }
		);
		requestData.amount = amount;
		await createMatch(requestData, offerId);
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
					<label style={{ marginBottom: "16px" }}>{t("change_requested_amount")}</label>
					<input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
				</div>
				<div className="InputField" style={{ maxWidth: "250px", marginBottom: "16px" }}>
					<label style={{ marginBottom: "16px" }}>
						{t("protocol_number")}
						<span className="required">*</span>
					</label>
					{hasNumberError && <p className="error">{t("field_required")}</p>}
					<input
						type="text"
						value={protocolNumber}
						onChange={e => {
							setProtocolNumber(e.target.value);
							setNumberError(false);
						}}
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
					<Button label="confirm" handleClick={confirmMatch} classes={{ inline: true, secondary: true }} />
				</div>
			</div>
		</ExchangeAttemptStoreProvider>
	);
};
