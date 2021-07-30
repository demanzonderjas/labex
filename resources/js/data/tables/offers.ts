import { TextCell } from "../../components/overviews/table/TextCell";
import { DateAvailableCell } from "../../components/overviews/table/DateAvailableCell";
import { DateCell } from "../../components/overviews/table/DateCell";
import { TSpecificationName } from "../../typings/exchanges";
import { TTableCell } from "../../typings/overviews";

export const offerColumns: string[] = [
	TSpecificationName.ExchangeType,
	TSpecificationName.AnimalSpecies,
	TSpecificationName.Sex,
	"age_offer",
	TSpecificationName.Amount,
	TSpecificationName.DateAvailable,
	"is_match",
	"copy_header"
];

export const offerCells: TTableCell[] = [
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
		Component: DateCell
	},
	{
		id: TSpecificationName.Amount,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.DateAvailable,
		value: "",
		Component: DateAvailableCell
	}
];
