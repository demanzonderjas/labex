import { PercentageCell } from "../../components/overviews/table/PercentageCell";
import { TextCell } from "../../components/overviews/table/TextCell";
import { TableCell } from "../../typings/Overview";
import { DateCell } from "../../components/overviews/table/DateCell";
import { MatchButtonCell } from "../../components/overviews/table/custom/MatchButtonCell";
import { AgeCell } from "../../components/overviews/table/AgeCell";
import { AgeRangeCell } from "../../components/overviews/table/AgeRangeCell";
import { DateAvailableCell } from "../../components/overviews/table/DateAvailableCell";

export const offerMatchColumns: string[] = [
	"match_percentage",
	"type",
	"animal_species",
	"sex",
	"age_offer",
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
	"amount",
	"date_requested",
	"select_header"
];

export const offerMatchCells = [
	{
		id: "match_percentage",
		value: "",
		Component: PercentageCell
	},
	{
		id: "type",
		value: "",
		Component: TextCell
	},
	{
		id: "animal_species",
		value: "",
		Component: TextCell
	},
	{
		id: "sex",
		value: "",
		Component: TextCell
	},
	{
		id: "age",
		label: "age_offer",
		value: "",
		Component: AgeCell
	},
	{
		id: "amount",
		value: "",
		Component: TextCell
	},
	{
		id: "date_available",
		value: "",
		Component: DateAvailableCell
	},
	{
		id: "match_percentage",
		value: "",
		Component: MatchButtonCell
	}
];

export const requestMatchCells = [
	{
		id: "match_percentage",
		value: "",
		Component: PercentageCell
	},
	{
		id: "type",
		value: "",
		Component: TextCell
	},
	{
		id: "animal_species",
		value: "",
		Component: TextCell
	},
	{
		id: "sex",
		value: "",
		Component: TextCell
	},
	{
		id: "age",
		label: "age_range",
		value: "",
		Component: AgeRangeCell
	},
	{
		id: "amount",
		value: "",
		Component: TextCell
	},
	{
		id: "date_requested",
		value: "",
		Component: DateCell
	},
	{
		id: "match_percentage",
		value: "",
		Component: MatchButtonCell
	}
];
