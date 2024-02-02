import { TSpecificationName } from "../../typings/exchanges";
import { TFormField } from "../../typings/forms";

export function getFieldById(id: TSpecificationName, fields: TFormField[]) {
	return fields.find((field) => field.id == id);
}
