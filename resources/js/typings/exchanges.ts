import { TSpecification } from "./overviews";
import { TUser } from "./user";

export enum TExchangeAttemptType {
	Offer = "offer",
	Request = "request",
	Admin = "admin"
}

export type TExchangeAttempt = {
	id: number;
	origin_id: number;
	attempt_type: TExchangeAttemptType;
	status: TExchangeAttemptStatus;
	user?: TUser;
	is_match?: boolean;
	is_mine?: boolean;
	match_percentage?: number;
	adoption_info?: TAdoptionInfo;
	specifications: TSpecification[];
	created_at: string;
	remaining: string | number;
};

export type TExportableOffer = TExchangeAttempt & {
	offered: number;
	matched: number;
	adopted: number;
	remaining: number;
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
	DateAvailableStart = "date_available_start",
	DateAvailableEnd = "date_available",
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
	Location = "location",
	Status = "status",
	OriginId = "origin_id",
	AnimalNumbers = "animal_numbers",
	Remaining = "remaining"
}

export type TMatch = {
	id: number;
	offer: TExchangeAttempt;
	request: TExchangeAttempt;
	admin_actions: TAdminAction[];
	status: TMatchStatus;
	updated_at: string;
	is_approved_by_you?: boolean;
};

export type TAdminAction = {
	admin?: TUser;
	action: string;
	message: string;
};

export enum TMatchStatus {
	Approved = "approved",
	ApprovedOnce = "approved_once",
	AwaitingApproval = "awaiting_approval",
	Rejected = "rejected"
}

export type TAdoptionInfo = {
	code: string;
	amount: number;
};
