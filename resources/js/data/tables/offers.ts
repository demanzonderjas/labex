import { TextCell } from "../../components/overviews/table/TextCell";
import { DateAvailableCell } from "../../components/overviews/table/DateAvailableCell";
import { DateCell } from "../../components/overviews/table/DateCell";
import { TSpecificationName } from "../../typings/exchanges";
import { TTableCell, TTableCellName } from "../../typings/overviews";
import { BooleanCell } from "../../components/overviews/table/BooleanCell";
import { CopyButtonCell } from "../../components/overviews/table/custom/CopyButtonCell";
import { DeleteButtonCell } from "../../components/overviews/table/custom/DeleteButtonCell";
import { EditButtonCell } from "../../components/overviews/table/custom/EditButtonCell";
import { ManageAdoptionCell } from "../../components/overviews/table/custom/ManageAdoptionCell";
import { AgeCell } from "../../components/overviews/table/AgeCell";
import { TFormFieldName } from "../../typings/forms";
import { UserCell } from "../../components/overviews/table/custom/UserCell";
import { ConnectButtonCell } from "../../components/overviews/table/custom/ConnectButton";

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

export const baseOfferCells: TTableCell[] = [
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
		id: TSpecificationName.Remaining,
		label: "amount",
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.DateAvailableEnd,
		value: "",
		Component: DateAvailableCell
	}
];

export const offerCells: TTableCell[] = [
	...baseOfferCells,
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

export const adminOfferCells: TTableCell[] = [
	{
		id: TTableCellName.ID,
		value: "",
		Component: TextCell
	},
	{
		id: TTableCellName.OriginID,
		value: "",
		Component: TextCell
	},
	{
		id: TFormFieldName.User,
		value: "",
		Component: UserCell
	},
	{
		id: TFormFieldName.AdoptionCode,
		value: "",
		Component: TextCell
	},
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
		Component: AgeCell
	},
	{
		id: TSpecificationName.Amount,
		value: "",
		Component: TextCell
	},
	{
		id: TFormFieldName.AdoptionAmount,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.DateAvailableEnd,
		value: "",
		Component: DateAvailableCell
	},
	{
		id: TTableCellName.MagicCell,
		value: "",
		Component: TextCell
	},
	{
		id: TSpecificationName.Status,
		label: "is_active",
		value: "",
		Component: BooleanCell
	},
	{
		id: TTableCellName.IsMatch,
		value: "",
		Component: BooleanCell
	},
	{
		id: TTableCellName.EditButton,
		label: "edit",
		value: "",
		Component: EditButtonCell
	},
	{
		id: TTableCellName.DeleteButton,
		label: "delete",
		value: "",
		Component: DeleteButtonCell
	},
	{
		id: TTableCellName.AdoptionButton,
		label: "manage_adoption",
		value: "",
		Component: ManageAdoptionCell
	}
];

export const connectOffersCells = [
	...baseOfferCells,
	{
		id: TTableCellName.ConnectButton,
		Component: ConnectButtonCell
	}
];
