import { BooleanCell } from "../../components/overviews/table/BooleanCell";
import { ApproveButtonCell } from "../../components/overviews/table/custom/ApproveButtonCell";
import { DeleteSignupButtonCell } from "../../components/overviews/table/custom/DeleteSignupButtonCell";
import { NameCell } from "../../components/overviews/table/NameCell";
import { TextCell } from "../../components/overviews/table/TextCell";

export const signupColumns: string[] = [
	"id",
	"name",
	"email",
	"approved_label",
	"approve",
	"delete",
];

export const signupCells = [
	{
		id: "id",
		value: "",
		Component: TextCell,
	},
	{
		id: "name",
		value: "",
		Component: NameCell,
	},
	{
		id: "email",
		value: "",
		Component: TextCell,
	},
	{
		id: "approved",
		value: "",
		Component: BooleanCell,
	},
	{
		id: "approve",
		value: "",
		Component: ApproveButtonCell,
	},
	{
		id: "delete",
		value: "",
		Component: DeleteSignupButtonCell,
	},
];
