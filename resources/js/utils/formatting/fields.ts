import { TFormField } from "../../typings/forms";

export function generateOtherFieldId(id: string) {
	return `${id}_other`;
}

export function changeFieldId(field: TFormField, id: string) {
	return { ...field, id };
}

export function withRequired(field: TFormField) {
	return { ...field, required: true };
}
