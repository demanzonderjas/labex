import React from "react";
import { TUser } from "./User";

export enum TOverviewType {
	Cards,
	Table,
	UserCards
}

export type TTableCell = {
	id: string;
	label?: string;
	value: any;
	Component: React.FC<TTableCellProps>;
};

export type TTableCellProps = {
	value: any;
	rowIndex: number;
};

export interface TOfferCard extends TSampleCard {
	id: number;
	animal_species: string;
	date_available: string;
	match_percentage: number;
	amount: string;
	sex: string;
	origin: string;
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
	animal_species: string;
	date_requested: string;
	age_min: string;
	age_max: string;
	age_type: string;
	amount: string;
	sex: string;
	origin: string;
	type: string;
	is_mine: boolean;
	specifications: TSpecification[];
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
	is_match?: boolean;
	specifications: TSpecification[];
}

export enum MatchType {
	Requests = "requests",
	Offers = "offers",
	Admin = "admin"
}

export enum TDashboardOverview {
	Requests = "requests",
	Offers = "offers",
	Matches = "matches"
}
