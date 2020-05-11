import { FormField } from "../../typings/Form";

export function getFieldById(id: string, fields: FormField[]) {
	return fields.find(field => field.id == id);
}
