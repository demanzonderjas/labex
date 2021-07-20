export enum SampleType {
	Animal = "animal",
	VitalTissue = "vital_tissue",
	ConservedTissue = "conserved_tissue"
}

export enum SpecStatus {
	Match = "match",
	PartialMatch = "partial_match",
	NoMatch = "no_match",
	NotSubmitted = "not_submitted"
}

export type TSpecMatch = {
	status: SpecStatus;
	weight?: number;
	filterValue?: string;
};
