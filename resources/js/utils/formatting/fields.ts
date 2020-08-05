import { FormField } from "../../typings/Form";

export function generateOtherFieldId(id: string) {
	return `${id}_other`;
}

export function changeFieldId(field: FormField, id: string) {
	return { ...field, id };
}

export function withRequired(field: FormField) {
	return { ...field, required: true };
}
