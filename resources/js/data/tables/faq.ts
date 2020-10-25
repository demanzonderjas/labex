import { BooleanCell } from "../../components/overviews/table/BooleanCell";
import { DeleteItemCell } from "../../components/overviews/table/custom/DeleteItemCell";
import { EditItemCell } from "../../components/overviews/table/custom/EditItemCell";
import { NameCell } from "../../components/overviews/table/NameCell";
import { TextCell } from "../../components/overviews/table/TextCell";

export const faqItemColumns: string[] = [
    "id",
    "title",
    "category",
    "show",
    "edit",
    "delete"
];

export const faqItemCells = [
	{
		id: "id",
		value: "",
		Component: TextCell
	},
	{
		id: "title",
		value: "",
		Component: NameCell 
	},
	{
		id: "category",
		value: "",
		Component: TextCell
	},
	{
		id: "show",
		value: "",
		Component: BooleanCell
	},
	{
		id: "edit",
		value: "",
		Component: EditItemCell
    },
    {
		id: "delete",
		value: "",
		Component: DeleteItemCell 
	}
];