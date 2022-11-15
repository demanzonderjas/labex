import { PercentageCell } from "../../components/overviews/table/PercentageCell";
import { TextCell } from "../../components/overviews/table/TextCell";
import { DateCell } from "../../components/overviews/table/DateCell";
import { MatchButtonCell } from "../../components/overviews/table/custom/MatchButtonCell";
import { AgeCell } from "../../components/overviews/table/AgeCell";
import { AgeRangeCell } from "../../components/overviews/table/AgeRangeCell";
import { DateAvailableCell } from "../../components/overviews/table/DateAvailableCell";
import { TTableCell, TTableCellName } from "../../typings/overviews";
import { TSpecificationName } from "../../typings/exchanges";

export const offerMatchColumns: string[] = [
	"match_percentage",
	"type",
	"animal_species",
	"sex",
	"age_offer",
	"magic_cell",
	"amount",
	"date_available",
	"select_header"
];

export const requestMatchColumns: string[] = [
	"match_percentage",
	"type",
	"animal_species",
	"sex",
	"age_offer",
	"magic_cell",
	"amount",
	"date_requested",
	"select_header"
];

export const offerMatchCells: TTableCell[] = [
	{
		id: TSpecificationName.MatchPercentage,
		value: "",
		Component: PercentageCell
	},
	{
		id: TSpecificationName.ExchangeType,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.AnimalSpecies,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.Sex,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.Age,
		label: "age_offer",
		value: "",
		Component: AgeCell
	},
	{
		id: TTableCellName.MagicCell,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.Amount,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.DateAvailableEnd,
		value: "",
		Component: DateAvailableCell
	},
	{
		id: TTableCellName.MatchButton,
		value: "",
		Component: MatchButtonCell
	}
];

export const requestMatchCells: TTableCell[] = [
	{
		id: TSpecificationName.MatchPercentage,
		value: "",
		Component: PercentageCell
	},
	{
		id: TSpecificationName.ExchangeType,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.AnimalSpecies,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.Sex,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.Age,
		label: "age_range",
		value: "",
		Component: AgeRangeCell
	},
	{
		id: TTableCellName.MagicCell,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.Amount,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.DateRequested,
		value: "",
		Component: DateCell
	},
	{
		id: TTableCellName.MatchButton,
		value: "",
		Component: MatchButtonCell
	}
];

export const adminOfferCells: TTableCell[] = [
	{
		id: TSpecificationName.ExchangeType,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.AnimalSpecies,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.Sex,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.Age,
		label: "age_offer",
		value: "",
		Component: AgeCell
	},
	{
		id: TTableCellName.MagicCell,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.Amount,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.DateAvailableEnd,
		value: "",
		Component: DateAvailableCell
	}
];
