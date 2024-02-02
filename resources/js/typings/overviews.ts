import React from "react";
import { TExchangeAttempt, TSpecificationName } from "./exchanges";
import { TFormFieldName } from "./forms";
import { TUser } from "./user";

export enum TOverviewType {
	Cards,
	Table,
	UserCards,
}

export type TTableCell = {
	id: TSpecificationName | TTableCellName | TFormFieldName;
	label?: string;
	value: any;
	Component: React.FC<TTableCellProps>;
};

export enum TTableCellName {
	ID = "id",
	OriginID = "origin_id",
	MagicCell = "magic_cell",
	MatchButton = "match_button",
	IsMatch = "is_match",
	CopyButton = "copy_button",
	DeleteButton = "delete_button",
	EditButton = "edit_button",
}

export type TTableCellProps = {
	value: any;
	rowIndex: number;
	attempt?: TExchangeAttempt;
};

export interface TOfferCard extends TSampleCard {
	id: number;
	date_available: string;
	match_percentage: number;
	type: string;
	is_mine: boolean;
	specifications: TSpecification[];
}

export type TSpecification = {
	key: string;
	value: string;
};

export interface TRequestCard extends TSampleCard {
	id: number;
	date_requested: string;
	type: string;
	is_mine: boolean;
	specifications: TSpecification[];
}

export interface TSampleCard {
	id: number;
	date_available: string;
	match_percentage: number;
	type: string;
	user?: TUser;
	is_match?: boolean;
	specifications: TSpecification[];
}

export enum MatchType {
	Requests = "requests",
	Offers = "offers",
	Admin = "admin",
}

export enum TDashboardOverview {
	Requests = "requests",
	Offers = "offers",
	Matches = "matches",
}
