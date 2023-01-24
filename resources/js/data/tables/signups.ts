import { BooleanCell } from "../../components/overviews/table/BooleanCell";
import { ApproveButtonCell } from "../../components/overviews/table/custom/ApproveButtonCell";
import { BlockButtonCell } from "../../components/overviews/table/custom/BlockButtonCell";
import { DeleteSignupButtonCell } from "../../components/overviews/table/custom/DeleteSignupButtonCell";
import { NameCell } from "../../components/overviews/table/NameCell";
import { TextCell } from "../../components/overviews/table/TextCell";

export const signupColumns: string[] = [
	"id",
	"name",
	"email",
	"organisation",
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
		id: "organisation",
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
		Component: ApproveButtonCell
	},
	{
		id: "block",
		value: "",
		Component: BlockButtonCell
	},
	{
		id: "delete",
		value: "",
		Component: DeleteSignupButtonCell
	}
];
