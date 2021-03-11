import { TextCell } from "../../components/overviews/table/TextCell";
import { DateAvailableCell } from "../../components/overviews/table/DateAvailableCell";
import { DateCell } from "../../components/overviews/table/DateCell";

export const offerColumns: string[] = [
	"type",
	"animal_species",
	"sex",
	"age_offer",
	"amount",
	"date_available",
	"is_match",
	"copy_header"
];

export const offerCells = [
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
		Component: DateCell
	},
	{
		id: "amount",
		value: "",
		Component: TextCell
	},
	{
		id: "magic_cell",
		value: "",
		Component: TextCell
	},
	{
		id: "date_available",
		value: "",
		Component: DateAvailableCell
	}
];
