export enum SampleType {
	Animal = "animal",
	VitalTissue = "vital_tissue",
	ConservedTissue = "conserved_tissue"
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
