import { TFormField } from "../../typings/forms";
import { TSpecStatus } from "../../typings/specifications";

export function fieldMeetsDependencies(field: TFormField, index: number, fields: TFormField[]) {
	if (!field.dependencies) {
		return true;
	}
	return field.dependencies.every(dependency => {
		const parentField = fields.find(field => field.id == dependency.id);
		if (!parentField) {
			return false;
		}
		return dependency.validate(parentField.value, fields);
	});
}

export function fieldIsNotHidden(field: TFormField) {
	return !field.hidden;
}

export function fieldWasFilled(field: TFormField) {
	return field.match && field.match.status != TSpecStatus.NotSubmitted && field.value != "";
}

export function fieldShouldBeIgnoredInMatch(field: TFormField) {
	return field.ignoreInMatch;
}
