import { FormField } from "../../typings/Form";

export function fieldMeetsDependencies(field: FormField, index: number, fields: FormField[]) {
	if (!field.dependencies) {
		return true;
	}
	return field.dependencies.every(dependency => {
		const parentField = fields.find(field => field.id == dependency.id);
		return parentField.value == dependency.value;
	});
}
