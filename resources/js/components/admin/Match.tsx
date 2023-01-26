import React, { useState } from "react";
import { MatchType } from "../../typings/overviews";
import { ApproveButtons } from "./ApproveButtons";
import { Match as MatchCards } from "../match/Match";
import { TMatch, TMatchStatus, TSpecificationName } from "../../typings/exchanges";
import { useTranslationStore } from "../../hooks/useTranslationStore";
import { Button } from "../base/Button";
import { useMatchStore } from "../../hooks/useMatchStore";

type Props = {
	match: TMatch;
};

export const Match: React.FC<Props> = ({ match }) => {
	const [amount, setAmount] = useState<number>(
		+match.offer.specifications.find(s => s.key == TSpecificationName.Amount)?.value
	);
	const { t } = useTranslationStore();
	const { updateMatchAmount } = useMatchStore();

	return (
		<div className="AdminMatch" key={match.id}>
			<MatchCards match={match} matchType={MatchType.Admin} />
			<div className="controls">
				{(match.status === TMatchStatus.AwaitingApproval ||
					match.status === TMatchStatus.ApprovedOnce) &&
					!match.is_approved_by_you && <ApproveButtons matchId={match.id} />}
				<div className="UpdateMatchAmount">
					<h3>{t("match_amount")}</h3>
					<div className="InputField">
						<input
							type="number"
							value={amount}
							onChange={e => setAmount(+e.target.value)}
						/>
					</div>
					<Button
						label="change_amount"
						classes={{ tertiary: true, small: true, inline: true }}
						handleClick={() => updateMatchAmount(match.id, amount)}
					/>
				</div>
			</div>
		</div>
	);
};
