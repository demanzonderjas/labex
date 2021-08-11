import { TSpecification } from "./overviews";
import { TUser } from "./user";

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
	AttemptType = "attempt_type",
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
	MatchPercentage = "match_percentage",
	Other = "other",
	SuitableForAdoption = "suitable_for_adoption",
	Location = "location"
}

export type TMatch = {
	id: number;
	offer: TExchangeAttempt;
	request: TExchangeAttempt;
	status: TMatchStatus;
	updated_at: string;
};

export enum TMatchStatus {
	Approved = "approved",
	AwaitingApproval = "awaiting_approval",
	Rejected = "rejected"
}
