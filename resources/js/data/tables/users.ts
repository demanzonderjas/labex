import { TextCell } from "../../components/overviews/table/TextCell";
import { TTableCell } from "../../typings/overviews";

export const userColumns = ["id", "name", "email"];

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
	}
];
