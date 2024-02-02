import { TSpecification } from "./overviews";
import { TUser } from "./user";

export enum TExchangeAttemptType {
	Offer = "offer",
	Request = "request",
	Admin = "admin",
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
	specifications: TSpecification[];
	created_at: string;
};

export type TExportableOffer = TExchangeAttempt & {
	offered: number;
	matched: number;
	remaining: number;
};

export enum TExchangeAttemptStatus {
	Active = "active",
	Inactive = "inactive",
}

export enum TSpecificationName {
	AnimalSpecies = "animal_species",
	DeviceType = "device_type",
	ExchangeType = "type",
	AvailabilityType = "availability_type",
	ProductProducerNumber = "product_producer_number",
	ReasonForAvailability = "reason_for_availability",
	PackagingMethod = "packaging_method",
	ContactDetails = "contact_details",
	PartialUse = "partial_use",
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
	Location = "location",
	Status = "status",
	OriginId = "origin_id",
	Specifications = "specifications",
	SubstanceCategory = "substance_category",
	SubstanceDetails = "substance_details",
	DisposableCategory = "disposable_category",
	DisposableDetails = "disposable_details",
	SafetyAspects = "safety_aspects",
	Number = "number",
}

export type TMatch = {
	id: number;
	offer: TExchangeAttempt;
	request: TExchangeAttempt;
	admin_actions: TAdminAction[];
	status: TMatchStatus;
	updated_at: string;
};

export type TAdminAction = {
	action: string;
	message: string;
};

export enum TMatchStatus {
	Approved = "approved",
	AwaitingApproval = "awaiting_approval",
	Rejected = "rejected",
}
