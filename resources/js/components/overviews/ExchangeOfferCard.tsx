import React from "react";
import { LocalImage } from "../base/Image";
import { TExchangeOfferCard } from "../../typings/Overview";
import { useTranslationStore } from "../../hooks/useTranslationStore";

export const ExchangeOfferCard: React.FC<TExchangeOfferCard> = ({
	animal_species,
	amount,
	date_available,
	gender,
	origin
}) => {
	const { t } = useTranslationStore();
	return (
		<div className="ExchangeOfferCard">
			<div className="header">
				<LocalImage path="icons/placeholder-icon.svg" />
			</div>
			<div className="body">
				<ul>
					<li>
						<strong>{t("animal_species")}</strong>: {t(animal_species)}
					</li>
					<li>
						<strong>{t("date_available")}</strong>: {date_available}
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
