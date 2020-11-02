import { BooleanCell } from "../../components/overviews/table/BooleanCell";
import { NameCell } from "../../components/overviews/table/NameCell";
import { TextCell } from "../../components/overviews/table/TextCell";

export const signupColumns: string[] = [
    "id",
    "name",
    "email",
    "awaiting_approval_label",
    "approved_label",
    "approve",
    "block",
    "delete"
];

export const signupCells = [
	{
		id: "id",
		value: "",
		Component: TextCell
	},
	{
		id: "name",
		value: "",
		Component: NameCell 
	},
	{
		id: "email",
		value: "",
		Component: TextCell
	},
	{
		id: "awaiting_approval",
		value: "",
		Component: BooleanCell
    },
    {
		id: "approved",
		value: "",
		Component: BooleanCell
    },
    {
		id: "approve",
		value: "",
		Component: TextCell
    },
    {
		id: "block",
		value: "",
		Component: TextCell
    },
    {
		id: "delete",
		value: "",
		Component: TextCell
	},
];