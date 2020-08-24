import { TextCell } from "../../components/overviews/table/TextCell";
import { DateAvailableCell } from "../../components/overviews/table/DateAvailableCell";
import { BooleanCell } from "../../components/overviews/table/BooleanCell";
import { ButtonCell } from "../../components/overviews/table/ButtonCell";
import { CopyButtonCell } from "../../components/overviews/table/custom/CopyButtonCell";

export const offerColumns: string[] = [
	"type",
	"animal_species",
	"sex",
	"age_offer",
	"amount",
	"date_available",
	"is_match",
	"copy_header",
	"delete_header"
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
		Component: TextCell
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
		id: "is_match",
		value: "",
		Component: BooleanCell
	},
	{
		id: "copy",
		value: "",
		Component: CopyButtonCell
	},
	{
		id: "delete",
		value: "",
		Component: TextCell
	}
];
