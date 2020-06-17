import { PercentageCell } from "../../components/overviews/table/PercentageCell";
import { TextCell } from "../../components/overviews/table/TextCell";
import { TableCell } from "../../typings/Overview";
import { DateCell } from "../../components/overviews/table/DateCell";
import { ButtonCell } from "../../components/overviews/table/ButtonCell";
import { MatchButtonCell } from "../../components/overviews/table/custom/MatchButtonCell";

export const matchColumns: string[] = [
	"match_percentage",
	"type",
	"animal_species",
	"sex",
	"age",
	"amount",
	"date_available",
	"select_header"
];

export const matchCells: TableCell[] = [
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
		value: "",
		Component: DateCell
	},
	{
		id: "amount",
		value: "",
		Component: TextCell
	},
	{
		id: "date_available",
		value: "",
		Component: DateCell
	},
	{
		id: "match_percentage",
		value: "",
		Component: MatchButtonCell
	}
];
