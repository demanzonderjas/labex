import { DeleteUserButtonCell } from "../../components/overviews/table/custom/DeleteUserCell";
import { TextCell } from "../../components/overviews/table/TextCell";

export const userColumns = ["id", "name", "email", "organisation", "delete"];

export const userCells = [
	{
		id: "id",
		value: "",
		Component: TextCell
	},
	{
		id: "name",
		value: "",
		Component: TextCell
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
		id: "delete",
		value: "",
		Component: DeleteUserButtonCell
	}
];
