import React from "react";

export enum OverviewType {
	Cards,
	Table
}

export type TableCell = {
	id: string;
	value: any;
	Component: React.FC<TableCellProps>;
};

export type TableCellProps = {
	value: any;
	rowIndex: number;
};

export type TExchangeOfferCard = {
	id: number;
	animal_species: string;
	date_available: string;
	amount: string;
	sex: string;
	origin: string;
};

export type TExchangeRequestCard = {
	id: number;
	animal_species: string;
	date_requested: string;
	amount: string;
	sex: string;
	origin: string;
};

export type TMatch = {
	id: number;
	exchange_offer: TExchangeOfferCard;
	exchange_request: TExchangeRequestCard;
	awaiting_approval: boolean;
	approved: boolean;
};
