export enum TTypeSpec {
	Animal = "animal",
	VitalTissue = "vital_tissue",
	ConservedTissue = "conserved_tissue"
}

export enum TAgeType {
	Weeks = "weeks",
	Months = "months",
	Years = "years"
}

export enum TSpecStatus {
	Match = "match",
	PartialMatch = "partial_match",
	NoMatch = "no_match",
	NotSubmitted = "not_submitted"
}

export type TSpecMatch = {
	status: TSpecStatus;
	weight?: number;
	filterValue?: string;
};
