import { PercentageCell } from "../../components/overviews/table/PercentageCell";
import { DescriptionCell, TextCell } from "../../components/overviews/table/TextCell";
import { DateCell } from "../../components/overviews/table/DateCell";
import { MatchButtonCell } from "../../components/overviews/table/custom/MatchButtonCell";
import { DateAvailableCell } from "../../components/overviews/table/DateAvailableCell";
import { TTableCell, TTableCellName } from "../../typings/overviews";
import { TSpecificationName } from "../../typings/exchanges";
import { ImageCell } from "../../components/overviews/table/ImageCell";

export const offerMatchColumns: string[] = [
	"match_percentage",
	"type",
	"magic_cell",
	"date_available",
	"select_header",
];

export const requestMatchColumns: string[] = [
	"match_percentage",
	"type",
	"magic_cell",
	"date_requested",
	"select_header",
];

export const offerMatchCells: TTableCell[] = [
	{
		id: TSpecificationName.MatchPercentage,
		value: "",
		Component: PercentageCell,
	},
	{
		id: TSpecificationName.Title,
		value: "",
		Component: TextCell,
	},
	{
		id: TSpecificationName.Description,
		value: "",
		Component: DescriptionCell,
	},
	{
		id: TSpecificationName.Image,
		value: "",
		Component: ImageCell,
	},
	{
		id: TSpecificationName.ExchangeType,
		value: "",
		Component: TextCell,
	},
	{
		id: TTableCellName.MagicCell,
		value: "",
		Component: TextCell,
	},
	{
		id: TSpecificationName.DateAvailableEnd,
		value: "",
		Component: DateAvailableCell,
	},
	{
		id: TTableCellName.MatchButton,
		value: "",
		Component: MatchButtonCell,
	},
];

export const requestMatchCells: TTableCell[] = [
	{
		id: TSpecificationName.MatchPercentage,
		value: "",
		Component: PercentageCell,
	},
	{
		id: TSpecificationName.Title,
		value: "",
		Component: TextCell,
	},
	{
		id: TSpecificationName.Description,
		value: "",
		Component: DescriptionCell,
	},
	{
		id: TSpecificationName.ExchangeType,
		value: "",
		Component: TextCell,
	},
	{
		id: TTableCellName.MagicCell,
		value: "",
		Component: TextCell,
	},
	{
		id: TSpecificationName.DateRequested,
		value: "",
		Component: DateCell,
	},
	{
		id: TTableCellName.MatchButton,
		value: "",
		Component: MatchButtonCell,
	},
];
