import { TextCell } from "../../components/overviews/table/TextCell";
import { BooleanCell } from "../../components/overviews/table/BooleanCell";
import { DateCell } from "../../components/overviews/table/DateCell";
import { TSpecificationName } from "../../typings/exchanges";
import { TTableCell, TTableCellName } from "../../typings/overviews";
import { CopyButtonCell } from "../../components/overviews/table/custom/CopyButtonCell";
import { DeleteButtonCell } from "../../components/overviews/table/custom/DeleteButtonCell";
import { EditButtonCell } from "../../components/overviews/table/custom/EditButtonCell";

export const requestCells: TTableCell[] = [
	{
		id: TSpecificationName.Title,
		value: "",
		Component: TextCell,
	},
	{
		id: TSpecificationName.Description,
		value: "",
		Component: TextCell,
	},
	{
		id: TSpecificationName.ExchangeType,
		value: "",
		Component: TextCell,
	},
	{
		id: TSpecificationName.DateRequested,
		value: "",
		Component: DateCell,
	},
	{
		id: TTableCellName.IsMatch,
		value: "",
		Component: BooleanCell,
	},
	{
		id: TTableCellName.EditButton,
		value: "",
		Component: EditButtonCell,
	},
	{
		id: TTableCellName.CopyButton,
		value: "",
		Component: CopyButtonCell,
	},
	{
		id: TTableCellName.DeleteButton,
		value: "",
		Component: DeleteButtonCell,
	},
];
