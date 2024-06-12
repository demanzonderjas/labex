import { TextCell } from "../../components/overviews/table/TextCell";
import { DateAvailableCell } from "../../components/overviews/table/DateAvailableCell";
import { TSpecificationName } from "../../typings/exchanges";
import { TTableCell, TTableCellName } from "../../typings/overviews";
import { BooleanCell } from "../../components/overviews/table/BooleanCell";
import { CopyButtonCell } from "../../components/overviews/table/custom/CopyButtonCell";
import { DeleteButtonCell } from "../../components/overviews/table/custom/DeleteButtonCell";
import { EditButtonCell } from "../../components/overviews/table/custom/EditButtonCell";
import { TFormFieldName } from "../../typings/forms";
import { UserCell } from "../../components/overviews/table/custom/UserCell";
import { ImageCell } from "../../components/overviews/table/ImageCell";

export const offerColumns: string[] = [
	TSpecificationName.ExchangeType,
	TSpecificationName.DateAvailableEnd,
	TTableCellName.IsMatch,
	"copy_header",
];

export const offerCells: TTableCell[] = [
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
		id: TSpecificationName.DateAvailableEnd,
		value: "",
		Component: DateAvailableCell,
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

export const adminOfferCells: TTableCell[] = [
	{
		id: TTableCellName.ID,
		value: "",
		Component: TextCell,
	},
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
		id: TSpecificationName.Image,
		value: "",
		Component: ImageCell,
	},
	{
		id: TFormFieldName.User,
		value: "",
		Component: UserCell,
	},
	{
		id: TSpecificationName.ExchangeType,
		value: "",
		Component: TextCell,
	},
	{
		id: TSpecificationName.DateAvailableEnd,
		value: "",
		Component: DateAvailableCell,
	},
	{
		id: TTableCellName.MagicCell,
		value: "",
		Component: TextCell,
	},
	{
		id: TSpecificationName.Status,
		label: "is_active",
		value: "",
		Component: BooleanCell,
	},
	{
		id: TTableCellName.IsMatch,
		value: "",
		Component: BooleanCell,
	},
	{
		id: TTableCellName.EditButton,
		label: "edit",
		value: "",
		Component: EditButtonCell,
	},
	{
		id: TTableCellName.DeleteButton,
		label: "delete",
		value: "",
		Component: DeleteButtonCell,
	},
];
