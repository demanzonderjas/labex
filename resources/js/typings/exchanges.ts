import { TSpecification } from "./overviews";
import { TUser } from "./User";

export enum TExchangeAttemptType {
	Offer = "offer",
	Request = "request",
	Admin = "admin"
}

export type TExchangeAttempt = {
	id: number;
	attempt_type: TExchangeAttemptType;
	status: TExchangeAttemptStatus;
	user?: TUser;
	is_match?: boolean;
	is_mine?: boolean;
	match_percentage?: number;
	specifications: TSpecification[];
};

export enum TExchangeAttemptStatus {
	Active = "active",
	Inactive = "inactive",
	Adoption = "adoption"
}

export enum TSpecificationName {
	AnimalSpecies = "animal_species",
	ExchangeType = "type",
	Organs = "organs",
	DateAvailable = "date_available",
	DateRequested = "date_requested",
	Age = "age",
	AgeMin = "age_min",
	AgeMax = "age_max",
	AgeType = "age_type",
	SPF = "spf",
	Naive = "naive",
	Amount = "amount",
	Origin = "origin",
	KillMethod = "kill_method",
	Strain = "strain",
	ProtocolNumber = "protocol_number",
	Storage = "storage",
	Sex = "sex",
	ExtraInfo = "extra_info",
	SampleNumber = "sample_number",
	MatchPercentage = "match_percentage"
}
