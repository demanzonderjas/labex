import React from "react";
import { LocalImage } from "../base/Image";
import { TExchangeRequestCard } from "../../typings/Overview";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const ExchangeRequestCard: React.FC<TExchangeRequestCard> = ({
	animal_species,
	amount,
	date_requested,
	gender,
	origin
}) => {
	const { t } = useTranslationStore();
	return (
		<div className="ExchangeRequestCard card">
			<div className="header">
				<LocalImage path="icons/placeholder-icon.svg" />
			</div>
			<div className="body">
				<ul>
					<li>
						<strong>{t("animal_species")}</strong>: {t(animal_species)}
					</li>
					<li>
						<strong>{t("date_requested")}</strong>: {date_requested}
					</li>
					<li>
						<strong>{t("amount")}</strong>: {amount}
					</li>
					<li>
						<strong>{t("gender")}</strong>: {t(gender)}
					</li>
					<li>
						<strong>{t("origin")}</strong>: {t(origin)}
					</li>
				</ul>
			</div>
		</div>
	);
};
