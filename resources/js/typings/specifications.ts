export enum TTypeSpec {
	Equipment = "equipment",
	Chemicals = "chemicals",
	Disposables = "disposables",
	Furniture = "furniture",
}

export enum TAgeType {
	Weeks = "weeks",
	Months = "months",
	Years = "years",
}

export enum TSpecStatus {
	Match = "match",
	PartialMatch = "partial_match",
	NoMatch = "no_match",
	NotSubmitted = "not_submitted",
}

export type TSpecMatch = {
	status: TSpecStatus;
	weight?: number;
	filterValue?: string;
};
