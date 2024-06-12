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

export type TExportableOffer = TExchangeAttempt;

export enum TExchangeAttemptStatus {
	Active = "active",
	Inactive = "inactive",
}

export enum TSpecificationName {
	DeviceType = "device_type",
	ExchangeType = "type",
	AvailabilityType = "availability_type",
	ProductProducerNumber = "product_producer_number",
	ReasonForAvailability = "reason_for_availability",
	PackagingMethod = "packaging_method",
	ContactDetails = "contact_details",
	PartialUse = "partial_use",
	AttemptType = "attempt_type",
	DateAvailableStart = "date_available_start",
	DateAvailableEnd = "date_available",
	DateRequested = "date_requested",
	Storage = "storage",
	MatchPercentage = "match_percentage",
	Other = "other",
	LocationBuilding = "location_building",
	LocationRoom = "location_room",
	Status = "status",
	OriginId = "origin_id",
	Specifications = "specifications",
	SubstanceCategory = "substance_category",
	SubstanceDetails = "substance_details",
	DisposableCategory = "disposable_category",
	DisposableDetails = "disposable_details",
	SafetyAspects = "safety_aspects",
	Number = "number",
	ExtraInfo = "extra_info",
	VolumeWeight = "volume_weight",
	Amount = "amount",
	Title = "title",
	Description = "description",
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
