import { TextCell } from "../../components/overviews/table/TextCell";
import { DateAvailableCell } from "../../components/overviews/table/DateAvailableCell";
import { DateCell } from "../../components/overviews/table/DateCell";
import { TSpecificationName } from "../../typings/exchanges";
import { TTableCell, TTableCellName } from "../../typings/overviews";
import { BooleanCell } from "../../components/overviews/table/BooleanCell";
import { CopyButtonCell } from "../../components/overviews/table/custom/CopyButtonCell";
import { DeleteButtonCell } from "../../components/overviews/table/custom/DeleteButtonCell";
import { EditButtonCell } from "../../components/overviews/table/custom/EditButtonCell";

export const offerColumns: string[] = [
	TSpecificationName.ExchangeType,
	TSpecificationName.AnimalSpecies,
	TSpecificationName.Sex,
	"age_offer",
	TSpecificationName.Amount,
	TSpecificationName.DateAvailableEnd,
	TTableCellName.IsMatch,
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
		id: TSpecificationName.DateAvailableEnd,
		value: "",
		Component: DateAvailableCell
	},
	{
		id: TTableCellName.IsMatch,
		value: "",
		Component: BooleanCell
	},
	{
		id: TTableCellName.EditButton,
		value: "",
		Component: EditButtonCell
	},
	{
		id: TTableCellName.CopyButton,
		value: "",
		Component: CopyButtonCell
	},
	{
		id: TTableCellName.DeleteButton,
		value: "",
		Component: DeleteButtonCell
	}
];
