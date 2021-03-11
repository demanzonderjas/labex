import { TextCell } from "../../components/overviews/table/TextCell";
import { BooleanCell } from "../../components/overviews/table/BooleanCell";
import { AgeRangeCell } from "../../components/overviews/table/AgeRangeCell";
import { DateCell } from "../../components/overviews/table/DateCell";

export const requestColumns: string[] = [
	"type",
	"animal_species",
	"sex",
	"age_offer",
	"amount",
	"date_requested",
	"is_match",
	"copy_header"
];

export const requestCells = [
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
		id: "organs",
		value: "",
		Component: DateCell
	},
	{
		id: "is_match",
		value: "",
		Component: BooleanCell
	}
];
