import { createFaqItem } from "../../queries/admin/createFaqItem";
import { editFaqItem } from "../../queries/admin/editFaqItem";
import { TForm } from "../../typings/forms";
import { categoryField } from "./fields/faq/category";
import { contentField } from "./fields/faq/content";
import { idField } from "./fields/faq/id";
import { showField } from "./fields/faq/show";
import { titleField } from "./fields/faq/title";

export const EditFaqItemForm: TForm = {
	fields: [idField, titleField, contentField, categoryField, showField],
	handler: editFaqItem,
	fullWidthFields: true
};

export const CreateFaqItemForm: TForm = {
	fields: [titleField, contentField, categoryField, showField],
	handler: createFaqItem,
	fullWidthFields: true
};
