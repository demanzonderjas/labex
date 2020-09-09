import React from "react";
import { TUser } from "./User";

export enum OverviewType {
	Cards,
	Table
}

export type TableCell = {
	id: string;
	label?: string;
	value: any;
	Component: React.FC<TableCellProps>;
};

export type TableCellProps = {
	value: any;
	rowIndex: number;
};

export interface TExchangeOfferCard extends TSampleCard {
	id: number;
	animal_species: string;
	date_available: string;
	match_percentage: number;
	amount: string;
	sex: string;
	origin: string;
	type: string;
}

export interface TExchangeRequestCard extends TSampleCard {
	id: number;
	animal_species: string;
	date_requested: string;
	age_min: string;
	age_max: string;
	age_type: string;
	amount: string;
	sex: string;
	origin: string;
	type: string;
}

export interface TSampleCard {
	id: number;
	animal_species: string;
	date_available: string;
	match_percentage: number;
	age?: string;
	amount: string;
	sex: string;
	origin: string;
	type: string;
	user?: TUser;
}

export type TMatch = {
	id: number;
	exchange_offer: TExchangeOfferCard;
	exchange_request: TExchangeRequestCard;
	awaiting_approval: boolean;
	approved: boolean;
	updated_at: string;
};

export enum MatchType {
	Requests = "requests",
	Offers = "offers"
}
