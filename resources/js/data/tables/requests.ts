import { TextCell } from "../../components/overviews/table/TextCell";
import { BooleanCell } from "../../components/overviews/table/BooleanCell";
import { AgeRangeCell } from "../../components/overviews/table/AgeRangeCell";
import { DateCell } from "../../components/overviews/table/DateCell";
import { TSpecificationName } from "../../typings/exchanges";
import { TTableCell, TTableCellName } from "../../typings/overviews";
import { CopyButtonCell } from "../../components/overviews/table/custom/CopyButtonCell";
import { DeleteButtonCell } from "../../components/overviews/table/custom/DeleteButtonCell";
import { EditButtonCell } from "../../components/overviews/table/custom/EditButtonCell";

export const requestCells: TTableCell[] = [
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
		id: TSpecificationName.Organs,
		value: "",
		Component: DateCell
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
