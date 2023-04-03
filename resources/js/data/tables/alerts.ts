import { DeleteAlertCell } from "../../components/overviews/table/custom/DeleteAlertCell";
import { SpecificationCell } from "../../components/overviews/table/custom/SpecificationCell";
import { TextCell } from "../../components/overviews/table/TextCell";

export const alertsColumns: string[] = ["id", "specifications", "delete"];

export const adminAlertsColumns: string[] = ["id", "email", "specifications"];

export const alertsCells = [
	{
		id: "id",
		value: "",
		Component: TextCell
	},
	{
		id: "specifications",
		value: "",
		Component: SpecificationCell
	},
	{
		id: "delete",
		value: "",
		Component: DeleteAlertCell
	}
];

export const adminAlertsCells = [
	{
		id: "id",
		value: "",
		Component: TextCell
	},
	{
		id: "email",
		value: "",
		Component: TextCell
	},
	{
		id: "specifications",
		value: "",
		Component: SpecificationCell
	}
];
