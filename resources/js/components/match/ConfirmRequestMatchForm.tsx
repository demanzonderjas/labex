import React, { useState, useEffect } from "react";
import { TFormField } from "../../typings/forms";
import { createMatchSpecs } from "../../utils/formatting/matches";
import {
	fieldIsNotHidden,
	fieldMeetsDependencies,
	fieldWasFilled,
} from "../../utils/filters/fields";
import { Spec } from "./Spec";
import ExchangeAttemptStoreProvider from "../../contexts/ExchangeAttemptContext";
import { ExchangeAttemptStore } from "../../stores/ExchangeAttemptStore";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { useModalStore } from "../../hooks/useModalStore";
import { BlankButton, Button } from "../base/Button";
import { createMatch } from "../../queries/createMatch";
import { useNavigate } from "react-router-dom";

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
	const matches = createMatchSpecs(fields, filters);
	const navigate = useNavigate();
	const { t } = useTranslationStore();

	const confirmMatch = async () => {
		const requestData: any = filters.reduce(
			(base, next) => {
				base[next.id] = next.value;
				return base;
			},
			{ extra_info: extraInfo }
		);
		await createMatch(requestData, offerId);
		confirm();
		navigate("/app/my-matches?info=true");
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
					.map((match) => (
						<Spec key={match.id} {...match} fields={fields} />
					))}
			</div>
			<div className="extra-info">
				<label>{t("extra_info")}</label>
				<div className="BigTextField">
					<textarea
						value={extraInfo}
						onChange={(e) => setExtraInfo(e.target.value)}
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
